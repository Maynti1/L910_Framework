import { loadData, saveData, generateId } from './data.js';

let factories = loadData('factories.json');
let workers = loadData('workers.json');

export const setupFactoryRoutes = (app) => {
  // ===== FACTORIES =====
  app.get('/factory/factories', (req, res) => {
    res.json(factories);
  });

  app.get('/factory/factories/:id', (req, res) => {
    const factory = factories.find(f => f.id === req.params.id);
    if (factory) {
      res.json(factory);
    } else {
      res.status(404).json({ error: 'Завод не найден' });
    }
  });

  app.post('/factory/factories', (req, res) => {
    const newFactory = {
      id: generateId(),
      ...req.body,
      createdAt: new Date().toISOString(),
      active: true
    };

    if (!newFactory.name || !newFactory.location) {
      return res.status(400).json({ error: 'Название и локация обязательны' });
    }

    factories.push(newFactory);

    if (saveData('factories.json', factories)) {
      res.status(201).json(newFactory);
    } else {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  });

  // ===== WORKERS =====
  app.get('/factory/workers', (req, res) => {
    res.json(workers);
  });

  app.get('/factory/workers/:id', (req, res) => {
    const worker = workers.find(w => w.id === req.params.id);
    if (worker) {
      res.json(worker);
    } else {
      res.status(404).json({ error: 'Работник не найден' });
    }
  });

  app.post('/factory/workers', (req, res) => {
    const newWorker = {
      id: generateId(),
      ...req.body,
      hiredAt: new Date().toISOString(),
      isActive: true
    };

    if (!newWorker.name || !newWorker.position) {
      return res.status(400).json({ error: 'Имя и должность обязательны' });
    }

    workers.push(newWorker);

    if (saveData('workers.json', workers)) {
      res.status(201).json(newWorker);
    } else {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  });
};