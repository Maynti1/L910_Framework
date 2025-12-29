import { loadData, saveData, generateId } from './data.js';

let visitors = loadData('visitors.json');
let coaches = loadData('coaches.json');

export const setupPoolRoutes = (app) => {
  app.get('/pool/visitors', (req, res) => {
    res.json(visitors);
  });

  app.get('/pool/visitors/:id', (req, res) => {
    const visitor = visitors.find(v => v.id === req.params.id);
    if (visitor) {
      res.json(visitor);
    } else {
      res.status(404).json({ error: 'Посетитель не найден' });
    }
  });

  app.post('/pool/visitors', async (req, res) => {
    const newVisitor = {
      id: generateId(),
      ...req.body,
      registrationDate: new Date().toISOString(),
      visitCount: 0
    };
    
    if (!newVisitor.name || !newVisitor.email) {
      return res.status(400).json({ error: 'Имя и email обязательны' });
    }
    
    visitors.push(newVisitor);
    
    if (saveData('visitors.json', visitors)) {
      res.status(201).json(newVisitor);
    } else {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  });

  app.get('/pool/coaches', (req, res) => {
    res.json(coaches);
  });

};