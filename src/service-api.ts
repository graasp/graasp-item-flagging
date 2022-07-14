import { FastifyPluginAsync } from 'fastify';

import { ItemFlagService } from './db-service';
import { ItemFlag } from './interfaces/item-flag';
import common, { create, getFlags } from './schemas';
import { TaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const {
    items: { taskManager: iTM },
    taskRunner: runner,
  } = fastify;

  const iFS = new ItemFlagService();
  const taskManager = new TaskManager(iTM, iFS);

  // schemas
  fastify.addSchema(common);

  // get flags
  fastify.get('/flags', { schema: getFlags }, async ({ member, log }) => {
    const task = taskManager.createGetFlagsTask(member);
    return runner.runSingle(task, log);
  });

  // create item flag
  fastify.post<{ Params: { itemId: string }; Body: Partial<ItemFlag> }>(
    '/:itemId/flags',
    { schema: create },
    async ({ member, params: { itemId }, body, log }) => {
      const tasks = taskManager.createCreateTaskSequence(member, body, itemId);
      return runner.runSingleSequence(tasks, log);
    },
  );
};

export default plugin;
