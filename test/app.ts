import fastify from 'fastify';

import { Actor, ItemTaskManager, TaskRunner } from '@graasp/sdk';

import plugin from '../src/service-api';

const schemas = {
  $id: 'http://graasp.org/',
  definitions: {
    uuid: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    },
    idParam: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { $ref: '#/definitions/uuid' },
      },
      additionalProperties: false,
    },
  },
};

const build = async ({
  runner,
  itemTaskManager,
}: {
  runner: TaskRunner<Actor>;
  itemTaskManager: ItemTaskManager;
}) => {
  const app = fastify();
  app.addSchema(schemas);

  app.decorate('taskRunner', runner);
  app.decorate('items', { taskManager: itemTaskManager });
  await app.register(plugin);

  return app;
};
export default build;
