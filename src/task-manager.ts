// other services
import { Member, ItemService, ItemMembershipService } from 'graasp';
// local
import { ItemFlagService } from './db-service';
import { ItemFlag } from './interfaces/item-flag';
import { CreateItemFlagTask } from './tasks/create-item-flag-task';
import { ItemFlagTaskManager } from './interfaces/item-flag-task-manager';
import { GetFlagsTask } from './tasks/get-flags-task';

export class TaskManager implements ItemFlagTaskManager {
  private itemService: ItemService;
  private itemMembershipService: ItemMembershipService;
  private itemFlagService: ItemFlagService;

  constructor(
    itemService: ItemService,
    itemMembershipService: ItemMembershipService,
    itemFlagService: ItemFlagService,
  ) {
    this.itemService = itemService;
    this.itemMembershipService = itemMembershipService;
    this.itemFlagService = itemFlagService;
  }

  getCreateTaskName(): string {
    return CreateItemFlagTask.name;
  }

  getGetFlagsName(): string {
    return GetFlagsTask.name;
  }

  createCreateTask(member: Member, data: Partial<ItemFlag>, itemId: string): CreateItemFlagTask {
    return new CreateItemFlagTask(
      member,
      data,
      itemId,
      this.itemService,
      this.itemMembershipService,
      this.itemFlagService,
    );
  }

  createGetFlagsTask(member: Member): GetFlagsTask {
    return new GetFlagsTask(member, this.itemFlagService);
  }
}
