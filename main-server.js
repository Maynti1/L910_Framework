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

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Добро пожаловать в L910-Framework!',
    description: 'Командный проект: Минималистичный веб-фреймворк',
    team: ['Участник 1: Бассейн', 'Участник 2: [Тема]', 'Участник 3: [Тема]'],
    services: {
      pool: '🏊 /pool/* - Управление бассейном',
      cinema: '🎬 /cinema/* - Управление кинотеатром'
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
  console.log('  GET    /pool/coaches          - Все тренеры');
  console.log('  GET    /pool/coaches/:id      - Тренер по ID');
  console.log('  POST   /pool/coaches          - Создать тренера');
  console.log('  PUT    /pool/coaches/:id      - Обновить тренера');
  console.log('  PATCH  /pool/coaches/:id      - Частично обновить');
  console.log('  DELETE /pool/coaches/:id      - Удалить тренера');
  console.log('');
  console.log('🎬 КИНОТЕАТР (Вариант 2):');
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
  console.log('===============================================');
  console.log('📚 Примеры запросов:');
  console.log('  curl http://localhost:3000/pool/visitors');
  console.log('  curl http://localhost:3000/cinema/movies');
  console.log('===============================================');
  console.log('👥 Ждем добавления сервисов от команды!');
});