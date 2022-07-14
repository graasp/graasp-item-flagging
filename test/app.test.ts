import { StatusCodes } from 'http-status-codes';

import { ItemTaskManager, TaskRunner } from 'graasp-test';
import MockTask from 'graasp-test/src/tasks/task';

import build from './app';
import { MOCK_FLAGS, MOCK_ITEM } from './fixtures';

const runner = new TaskRunner();
const itemTaskManager = new ItemTaskManager();

const buildAppOptions = () => ({
  runner,
  itemTaskManager,
});

describe('Item Flag Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /flags', () => {
    it('Successfully get flags', async () => {
      const app = await build(buildAppOptions());

      jest.spyOn(runner, 'runSingle').mockImplementation(async () => MOCK_FLAGS);

      const response = await app.inject({
        method: 'GET',
        url: '/flags',
      });

      await app.close();
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(await response.json()).toEqual(MOCK_FLAGS);
    });
  });

  describe('POST /:itemId/flags', () => {
    it('Successfully post item flag', async () => {
      const app = await build(buildAppOptions());

      jest
        .spyOn(itemTaskManager, 'createGetTaskSequence')
        .mockImplementation(() => [new MockTask(MOCK_ITEM)]);
      jest.spyOn(runner, 'runSingleSequence').mockImplementation(async () => MOCK_FLAGS);

      const response = await app.inject({
        method: 'POST',
        url: `/${MOCK_ITEM.id}/flags`,
        payload: { flagId: MOCK_FLAGS[0].id },
      });
      console.log('response: ', response);

      await app.close();
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(await response.json()).toEqual(MOCK_FLAGS);
    });

    it('Bad request if item id in not valid', async () => {
      const app = await build(buildAppOptions());

      const response = await app.inject({
        method: 'POST',
        url: '/invalid-id/flags',
        payload: MOCK_FLAGS[0],
      });

      await app.close();
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Bad request if flag id is not valid', async () => {
      const app = await build(buildAppOptions());

      const response = await app.inject({
        method: 'POST',
        url: `/${MOCK_ITEM.id}/flags`,
        payload: { id: 'invalid-id' },
      });

      await app.close();
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
