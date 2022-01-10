import { GraaspErrorDetails, GraaspError } from 'graasp';

export class GraaspItemFlagsError implements GraaspError {
  name: string;
  code: string;
  message: string;
  statusCode?: number;
  data?: unknown;
  origin: 'core' | 'plugin';

  constructor({ code, statusCode, message }: GraaspErrorDetails, data?: unknown) {
    this.name = code;
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.origin = 'plugin';
  }
}

export class ItemNotFound extends GraaspItemFlagsError {
  constructor(data?: unknown) {
    super({ code: 'GIFERR001', statusCode: 404, message: 'Item not found' }, data);
  }
}

export class MemberCannotReadItem extends GraaspItemFlagsError {
  constructor(data?: unknown) {
    super({ code: 'GIFERR002', statusCode: 403, message: 'Member cannot read item' }, data);
  }
}
export class FlagNotFound extends GraaspItemFlagsError {
  constructor(data?: unknown) {
    super({ code: 'GIFERR003', statusCode: 404, message: 'Flag not found' }, data);
  }
}
