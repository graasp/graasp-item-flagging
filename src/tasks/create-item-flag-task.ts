import { FastifyLoggerInstance } from 'fastify';

import { DatabaseTransactionHandler, TaskStatus } from '@graasp/sdk';
import { Member } from '@graasp/sdk';

import { BaseItemFlag } from '../base-item-flag';
import { ItemFlagService } from '../db-service';
import { ItemFlag } from '../interfaces/item-flag';
import { FlagNotFound } from '../util/graasp-item-flags-error';
import { BaseItemFlagTask } from './base-item-flag-task';

export class CreateItemFlagTask extends BaseItemFlagTask<ItemFlag> {
  get name(): string {
    return CreateItemFlagTask.name;
  }

  constructor(
    member: Member,
    data: Partial<ItemFlag>,
    itemId: string,
    itemFlagService: ItemFlagService,
  ) {
    super(member, itemFlagService);
    this.data = data;
    this.targetId = itemId;
  }

  async run(handler: DatabaseTransactionHandler, _log: FastifyLoggerInstance): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const flagId = this.data.flagId;

    // check if flag exists
    const flag = await this.itemFlagService.getFlag(flagId, handler);
    if (!flag) throw new FlagNotFound(flagId);

    const itemFlag = new BaseItemFlag(flagId, this.targetId, this.actor.id);

    // create flag
    this._result = await this.itemFlagService.create(itemFlag, handler);
    this.status = TaskStatus.OK;
  }
}
