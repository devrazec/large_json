import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');

const output = execSync(`jq . ${dataDir}/vese_transaction_default.json`);
writeFileSync(`${dataDir}/vese_transaction_formatted.json`, output);
