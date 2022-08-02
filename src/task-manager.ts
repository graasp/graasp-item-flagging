import { Actor, ItemTaskManager, Member, Task } from '@graasp/sdk';

import { ItemFlagService } from './db-service';
import { ItemFlag } from './interfaces/item-flag';
import { ItemFlagTaskManager } from './interfaces/item-flag-task-manager';
import { CreateItemFlagTask } from './tasks/create-item-flag-task';
import { GetFlagsTask } from './tasks/get-flags-task';

export class TaskManager implements ItemFlagTaskManager {
  private itemTaskManager: ItemTaskManager;
  private itemFlagService: ItemFlagService;

  constructor(itemTaskManager: ItemTaskManager, itemFlagService: ItemFlagService) {
    this.itemTaskManager = itemTaskManager;
    this.itemFlagService = itemFlagService;
  }

  getCreateTaskName(): string {
    return CreateItemFlagTask.name;
  }

  getGetFlagsName(): string {
    return GetFlagsTask.name;
  }

  createCreateTaskSequence(
    member: Member,
    data: Partial<ItemFlag>,
    itemId: string,
  ): Task<Actor, unknown>[] {
    const tasks = this.itemTaskManager.createGetTaskSequence(member, itemId);
    const t3 = new CreateItemFlagTask(member, data, itemId, this.itemFlagService);
    return [...tasks, t3];
  }

  createGetFlagsTask(member: Member): GetFlagsTask {
    return new GetFlagsTask(member, this.itemFlagService);
  }
}
