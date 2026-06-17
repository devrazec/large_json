import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const raw = readFileSync(join(__dirname, '../data/vese_transaction_formatted.json'), 'utf-8');
const data = JSON.parse(raw);

const parsed = data.flatMap((transaction) =>
  transaction.metervalues.map((mv) => ({
    id: mv.id,
    value: mv.value,
    transactionid: mv.transactionid,
    timestamp: mv.timestamp,
    unitofmeasure_description: mv.unitofmeasure?.description ?? null,
  }))
);

const outPath = join(__dirname, '../data/parsed_transactions.json');
writeFileSync(outPath, JSON.stringify(parsed, null, 2));
console.log(`Written ${parsed.length} rows to ${outPath}`);