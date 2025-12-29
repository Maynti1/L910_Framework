import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '../../data/cinema');

export const loadData = (filename) => {
  try {
    const data = readFileSync(join(DATA_DIR, filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка загрузки ${filename}:`, error.message);
    return [];
  }
};

export const saveData = (filename, data) => {
  try {
    writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения ${filename}:`, error.message);
    return false;
  }
};

export const generateId = () => {
  return 'cinema-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
