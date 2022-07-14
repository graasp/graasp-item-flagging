import { FastifyLoggerInstance } from 'fastify';

import {
  Actor,
  DatabaseTransactionHandler,
  IndividualResultType,
  Member,
  PostHookHandlerType,
  PreHookHandlerType,
  Task,
  TaskStatus,
} from '@graasp/sdk';

import { ItemFlagService } from '../db-service';

export abstract class BaseItemFlagTask<R> implements Task<Actor, R> {
  protected itemFlagService: ItemFlagService;
  protected _result: R;
  protected _message: string;

  readonly actor: Member;

  status: TaskStatus;
  targetId: string;
  data: Partial<IndividualResultType<R>>;
  preHookHandler: PreHookHandlerType<R>;
  postHookHandler: PostHookHandlerType<R>;

  constructor(actor: Member, itemFlagService: ItemFlagService) {
    this.actor = actor;
    this.itemFlagService = itemFlagService;
    this.status = TaskStatus.NEW;
  }

  abstract get name(): string;
  get result(): R {
    return this._result;
  }
  get message(): string {
    return this._message;
  }

  abstract run(
    handler: DatabaseTransactionHandler,
    log?: FastifyLoggerInstance,
  ): Promise<void | BaseItemFlagTask<R>[]>;
}
