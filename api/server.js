import express from 'express';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const databaseFile = resolve('database.json');

app.get('/data', async (req, res) => {
  try {
    const text = await readFile(databaseFile, 'utf8');
    res.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
