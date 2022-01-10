export default {
  $id: 'http://graasp.org/item-flags/',
  definitions: {
    itemIdParam: {
      type: 'object',
      required: ['itemId'],
      properties: {
        itemId: { $ref: 'http://graasp.org/#/definitions/uuid' },
      },
    },

    // item flag
    itemFlag: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        itemId: { type: 'string' },
        flagId: { type: 'string' },
        creator: { type: 'string' },
        createdAt: { type: 'string' },
      },
      additionalProperties: false,
    },

    // item flag properties required at creation
    createPartialItemFlag: {
      type: 'object',
      required: ['flagId'],
      properties: {
        flagId: { $ref: 'http://graasp.org/#/definitions/uuid' },
      },
      additionalProperties: false,
    },

    // flag
    flag: {
      type: 'object',
      properties: {
        id: { $ref: 'http://graasp.org/#/definitions/uuid' },
        name: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
};

// schema for creating an item flag
const create = {
  params: { $ref: 'http://graasp.org/item-flags/#/definitions/itemIdParam' },
  body: { $ref: 'http://graasp.org/item-flags/#/definitions/createPartialItemFlag' },
  response: {
    201: { $ref: 'http://graasp.org/item-flags/#/definitions/itemFlag' },
  },
};

// schema for getting flags
const getFlags = {
  response: {
    200: {
      type: 'array',
      items: { $ref: 'http://graasp.org/item-flags/#/definitions/flag' },
    },
  },
};

export { create, getFlags };
