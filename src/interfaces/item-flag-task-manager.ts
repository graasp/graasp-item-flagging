// global
import { Actor, Task } from 'graasp';
// local
import { ItemFlag } from './item-flag';

export interface ItemFlagTaskManager<A extends Actor = Actor> {
  getCreateTaskName(): string;

  createCreateTask(actor: A, object: Partial<ItemFlag>, extra?: unknown): Task<A, ItemFlag>;
}
