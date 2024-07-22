/* eslint-disable import/no-unresolved */

import type { Database } from "db/types";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join } from "path";

const file = join(process.cwd(), "db/mixes.json");
const adapter = new JSONFile<Database>(file);
const defaultData: Database = {
  backgroundCategories: [],
  backgrounds: [],
  categories: [],
  mixes: [],
};
const db = new Low<Database>(adapter, defaultData);

async function initializeDb(): Promise<void> {
  await db.read();
  db.data ||= defaultData;
}

/* eslint-disable unicorn/prefer-top-level-await */
initializeDb();
/* eslint-enable unicorn/prefer-top-level-await */

export { db, initializeDb };
