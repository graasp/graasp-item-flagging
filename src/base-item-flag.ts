// local
import { ItemFlag } from './interfaces/item-flag';

export class BaseItemFlag implements ItemFlag {
  id: string;
  readonly flagId: string;
  readonly itemId: string;
  readonly creator: string;
  createdAt: string;

  constructor(flagId: string, itemId: string, creator: string) {
    this.flagId = flagId;
    this.itemId = itemId;
    this.creator = creator;
  }
}
