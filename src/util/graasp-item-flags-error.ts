import { BaseGraaspError } from '@graasp/sdk';

import { PLUGIN_NAME } from './constants';

export class FlagNotFound extends BaseGraaspError {
  origin = PLUGIN_NAME;
  constructor(data?: unknown) {
    super({ code: 'GIFERR003', statusCode: 404, message: 'Flag not found' }, data);
  }
}
