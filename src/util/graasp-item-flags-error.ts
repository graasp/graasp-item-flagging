import { ErrorFactory } from '@graasp/sdk';

import { PLUGIN_NAME } from './constants';

export const GraaspError = ErrorFactory(PLUGIN_NAME);
export class FlagNotFound extends GraaspError {
  constructor(data?: unknown) {
    super({ code: 'GIFERR003', statusCode: 404, message: 'Flag not found' }, data);
  }
}
