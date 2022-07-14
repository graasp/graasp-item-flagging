import { Actor, Task } from '@graasp/sdk';

import { GetFlagsTask } from '../tasks/get-flags-task';
import { ItemFlag } from './item-flag';

export interface ItemFlagTaskManager<A extends Actor = Actor> {
  getCreateTaskName(): string;

  createCreateTaskSequence(actor: A, object: Partial<ItemFlag>, itemId: string): Task<A, unknown>[];
  createGetFlagsTask(member: A): GetFlagsTask;
}
