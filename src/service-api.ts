// global
import { FastifyPluginAsync } from 'fastify';

// local
import common, {
  create,
  getFlags
} from './schemas';
import { ItemFlagService } from './db-service';
import { ItemFlag } from './interfaces/item-flag';
import { TaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const {
    items: { dbService: iS },
    itemMemberships: { dbService: iMS },
    taskRunner: runner
  } = fastify;

  const iFS = new ItemFlagService();
  const taskManager = new TaskManager(iS, iMS, iFS);

  // schemas
  fastify.addSchema(common);

  // get flags
  fastify.get(
    '/flags', { schema: getFlags },
    async ({ member, log }) => {
      const task = taskManager.createGetFlagsTask(member);
      return runner.runSingle(task, log);
    }
  );

  // create item flag
  fastify.post<{ Params: { itemId: string }; Body: Partial<ItemFlag> }>(
    '/:itemId/flags', { schema: create },
    async ({ member, params: { itemId }, body, log }) => {
      const task = taskManager.createCreateTask(member, body, itemId);
      return runner.runSingle(task, log);
    }
  );

};

export default plugin;
