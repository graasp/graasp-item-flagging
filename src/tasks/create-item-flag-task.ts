// global
import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler } from 'graasp';
// other services
import { Member, ItemService, ItemMembershipService } from 'graasp';
// local
import { ItemNotFound, MemberCannotReadItem, FlagNotFound } from '../util/graasp-item-flags-error';
import { ItemFlagService } from '../db-service';
import { BaseItemFlagTask } from './base-item-flag-task';
import { BaseItemFlag } from '../base-item-flag';
import { ItemFlag } from '../interfaces/item-flag';

export class CreateItemFlagTask extends BaseItemFlagTask<ItemFlag> {
  get name(): string {
    return CreateItemFlagTask.name;
  }

  constructor(
    member: Member,
    data: Partial<ItemFlag>,
    itemId: string,
    itemService: ItemService,
    itemMembershipService: ItemMembershipService,
    itemFlagService: ItemFlagService,
  ) {
    super(member, itemService, itemMembershipService, itemFlagService);
    this.data = data;
    this.targetId = itemId;
  }

  async run(handler: DatabaseTransactionHandler, _log: FastifyLoggerInstance): Promise<void> {
    this.status = 'RUNNING';

    // get item that the new flag will target
    const item = await this.itemService.get(this.targetId, handler);
    if (!item) throw new ItemNotFound(this.targetId);

    // verify if member adding the new flag has rights for that
    const hasRights = await this.itemMembershipService.canRead(this.actor.id, item, handler);
    if (!hasRights) throw new MemberCannotReadItem(this.targetId);

    const flagId = this.data.flagId;

    // check if flag exists
    const flag = await this.itemFlagService.getFlag(flagId, handler);
    if (!flag) throw new FlagNotFound(flagId);

    const itemFlag = new BaseItemFlag(flagId, item.id, this.actor.id);

    // create flag
    this._result = await this.itemFlagService.create(itemFlag, handler);
    this.status = 'OK';
  }
}
