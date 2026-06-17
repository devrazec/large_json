import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const raw = readFileSync(join(__dirname, '../data/parsed_transactions.json'), 'utf-8');
const data = JSON.parse(raw);

const groupMap = new Map();

for (const row of data) {
  const key = `${row.timestamp}__${row.transactionid}`;
  if (!groupMap.has(key)) {
    groupMap.set(key, {
      timestamp: row.timestamp,
      transactionid: row.transactionid,
    });
  }
  groupMap.get(key)[row.unitofmeasure_description] = row.value;
}

const grouped = Array.from(groupMap.values());

const outPath = join(__dirname, '../data/grouped_transactions_by_timestamp.json');
writeFileSync(outPath, JSON.stringify(grouped, null, 2));
console.log(`Written ${grouped.length} groups to ${outPath}`);
