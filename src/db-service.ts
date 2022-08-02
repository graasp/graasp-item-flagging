import { DatabaseTransactionConnection as TrxHandler, sql } from 'slonik';

import { Flag } from './interfaces/flag';
import { ItemFlag } from './interfaces/item-flag';

/**
 * Database's first layer of abstraction for Item Flags
 */
export class ItemFlagService {
  // the 'safe' way to dynamically generate the columns names:
  private static allColumns = sql.join(
    [
      'id',
      ['flag_id', 'flagId'],
      ['item_id', 'itemId'],
      'creator',
      ['created_at', 'createdAt'],
    ].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  /**
   * Create ItemFlag.
   * @param itemFlag Partial ItemFlag object with `flagId`, `itemId`, `creator`.
   * @param transactionHandler Database transaction handler
   */
  async create(itemFlag: Partial<ItemFlag>, transactionHandler: TrxHandler): Promise<ItemFlag> {
    const { flagId, itemId, creator } = itemFlag;
    return transactionHandler
      .query<ItemFlag>(
        sql`
        INSERT INTO item_flag (flag_id, item_id, creator)
        VALUES (${flagId}, ${itemId}, ${creator})
        RETURNING ${ItemFlagService.allColumns}
      `,
      )
      .then(({ rows }) => rows[0]);
  }

  /**
   * Get flag.
   * @param flagId Flag id
   * @param transactionHandler Database transaction handler
   */
  async getFlag(flagId: string, transactionHandler: TrxHandler): Promise<Flag> {
    return transactionHandler
      .query<Flag>(
        sql`
        SELECT * FROM flag
        WHERE id = ${flagId}
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  /**
   * Get all flags.
   * @param transactionHandler Database transaction handler
   */
  async getAllFlags(transactionHandler: TrxHandler): Promise<readonly Flag[]> {
    return transactionHandler
      .query<Flag>(
        sql`
        SELECT *
        FROM flag
      `,
      )
      .then(({ rows }) => rows);
  }
}
