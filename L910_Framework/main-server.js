import { createApplication } from './index.js';

const app = createApplication();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

import { setupPoolRoutes } from './services/pool/routes.js';
setupPoolRoutes(app);

import { setupCinemaRoutes } from './services/cinema/routes.js';
setupCinemaRoutes(app);

// ✅ Подключаем твой сервис "Завод"
import { setupFactoryRoutes } from './services/factory/routes.js';
setupFactoryRoutes(app);

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Добро пожаловать в L910-Framework!',
    description: 'Командный проект: Минималистичный веб-фреймворк',
    team: [
      'Участник 1: Бассейн',
      'Участник 2: Кинотеатр',
      'Участник 3: Завод'
    ],
    services: {
      pool: '🏊 /pool/* - Управление бассейном',
      cinema: '🎬 /cinema/* - Управление кинотеатром',
      factory: '🏭 /factory/* - Управление заводом'
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('=======================================');
  console.log('🚀 L910-Framework запущен!');
  console.log(`📡 Главный сервер: http://localhost:${PORT}`);
  console.log('=======================================');
  console.log('Доступные сервисы:');
  console.log('🏊 Бассейн:');
  console.log('  GET    /pool/visitors         - Все посетители');
  console.log('  GET    /pool/visitors/:id     - Посетитель по ID');
  console.log('  POST   /pool/visitors         - Создать посетителя');
  console.log('  PUT    /pool/visitors/:id     - Обновить посетителя');
  console.log('  PATCH  /pool/visitors/:id     - Частично обновить');
  console.log('  DELETE /pool/visitors/:id     - Удалить посетителя');
  console.log('');
  console.log('🎬 Кинотеатр:');
  console.log('  GET    /cinema/movies         - Все фильмы');
  console.log('  GET    /cinema/movies/:id     - Фильм по ID');
  console.log('  POST   /cinema/movies         - Добавить фильм');
  console.log('  PUT    /cinema/movies/:id     - Обновить фильм');
  console.log('  PATCH  /cinema/movies/:id     - Частично обновить');
  console.log('  DELETE /cinema/movies/:id     - Удалить фильм');
  console.log('');
  console.log('  GET    /cinema/tickets        - Все билеты');
  console.log('  GET    /cinema/tickets/:id    - Билет по ID');
  console.log('  POST   /cinema/tickets        - Купить билет');
  console.log('  PUT    /cinema/tickets/:id    - Обновить билет');
  console.log('  PATCH  /cinema/tickets/:id    - Частично обновить');
  console.log('  DELETE /cinema/tickets/:id    - Отменить билет');
  console.log('  GET    /cinema/available-tickets - Свободные билеты');
  console.log('');
  console.log('🏭 Завод (Вариант 14):');
  console.log('  GET    /factory/factories     - Все заводы');
  console.log('  GET    /factory/factories/:id - Завод по ID');
  console.log('  POST   /factory/factories     - Создать завод');
  console.log('  PUT    /factory/factories/:id - Обновить завод');
  console.log('  PATCH  /factory/factories/:id - Частично обновить');
  console.log('  DELETE /factory/factories/:id - Удалить завод');
  console.log('');
  console.log('  GET    /factory/workers       - Все работники');
  console.log('  GET    /factory/workers/:id   - Работник по ID');
  console.log('  POST   /factory/workers       - Создать работника');
  console.log('  PUT    /factory/workers/:id   - Обновить работника');
  console.log('  PATCH  /factory/workers/:id   - Частично обновить');
  console.log('  DELETE /factory/workers/:id   - Удалить работника');
  console.log('===============================================');
  console.log('📚 Примеры запросов:');
  console.log('  curl http://localhost:3000/pool/visitors');
  console.log('  curl http://localhost:3000/cinema/movies');
  console.log('  curl http://localhost:3000/factory/factories');
  console.log('  curl http://localhost:3000/factory/workers');
  console.log('===============================================');
  console.log('👥 Ждем добавления сервисов от команды!');
});