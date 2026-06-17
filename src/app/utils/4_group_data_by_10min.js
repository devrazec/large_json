import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');

const data = JSON.parse(readFileSync(`${dataDir}/grouped_transactions_by_timestamp.json`, 'utf-8'));

const buckets = {};

for (const row of data) {
  const date = new Date(row.timestamp);
  date.setMinutes(Math.floor(date.getMinutes() / 10) * 10, 0, 0);
  const key = date.toISOString().replace('Z', '').replace('.000', '');

  if (!buckets[key]) buckets[key] = { V: [], A: [], W: [], Hz: [] };

  buckets[key].V.push(row.V);
  buckets[key].A.push(row.A);
  buckets[key].W.push(row.W);
  buckets[key].Hz.push(row.Hz);
}

const avg = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;

const result = Object.entries(buckets).map(([timestamp, vals]) => ({
  timestamp,
  V: Math.round(avg(vals.V) * 100) / 100,
  A: Math.round(avg(vals.A) * 100) / 100,
  W: Math.round(avg(vals.W) * 100) / 100,
  Hz: Math.round(avg(vals.Hz) * 100) / 100,
}));

writeFileSync(`${dataDir}/grouped_transactions_by_10min.json`, JSON.stringify(result, null, 2));
console.log(`Done — ${result.length} buckets written.`);
