import { readdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

const dataDir = resolve('data');
const outputFile = resolve('database.json');

async function main() {
  const files = await readdir(dataDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  const merged = [];

  for (const file of jsonFiles) {
    const text = await readFile(join(dataDir, file), 'utf8');
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      merged.push(...data);
    } else {
      merged.push(data);
    }
  }

  await writeFile(outputFile, JSON.stringify(merged, null, 2));
  console.log(`Database written to ${outputFile}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
