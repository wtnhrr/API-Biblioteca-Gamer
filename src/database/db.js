import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);

const db = new Low(adapter, { users: [], games: [] });

await db.read();
await db.write();

export default db;