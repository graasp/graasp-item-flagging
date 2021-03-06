import { DatabaseTransactionHandler, TaskStatus } from '@graasp/sdk';
import { Member } from '@graasp/sdk';

import { ItemFlagService } from '../db-service';
import { Flag } from '../interfaces/flag';
import { BaseItemFlagTask } from './base-item-flag-task';

export class GetFlagsTask extends BaseItemFlagTask<readonly Flag[]> {
  get name(): string {
    return GetFlagsTask.name;
  }

  constructor(member: Member, itemFlagService: ItemFlagService) {
    super(member, itemFlagService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    // get all flags
    const flags = await this.itemFlagService.getAllFlags(handler);

    this._result = flags;
    this.status = TaskStatus.OK;
  }
}
