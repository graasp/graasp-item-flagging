import { v4 } from 'uuid';

import { Item, ItemType } from '@graasp/sdk';

export const MOCK_FLAGS = [
  {
    id: v4(),
    name: 'flag-1',
  },
  {
    id: v4(),
    name: 'flag-2',
  },
  {
    id: v4(),
    name: 'flag-3',
  },
];

export const MOCK_ITEM: Item = {
  id: 'd5b9e015-5750-4014-b04b-9fc6853b149d',
  creator: 'd5b9e015-5750-4014-b04b-9fc6853b149d',
  path: 'd5b9e015_5750_4014_b04b_9fc6853b149d',
  name: 'mock-item',
  type: ItemType.FOLDER,
  extra: {},
  description: 'description',
  updatedAt: 'date',
  createdAt: 'date',
  settings: {},
};
