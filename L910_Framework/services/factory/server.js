import { createApplication } from '../../index.js';
import { setupFactoryRoutes } from './routes.js';

export const createFactoryServer = () => {
  const app = createApplication();

  // Логирование всех запросов к сервису Завода
  app.use((req, res, next) => {
    console.log(`[FACTORY] ${req.method} ${req.url}`);
    next();
  });

  // Подключаем маршруты для Завода
  setupFactoryRoutes(app);

  return app;
};

// Если запускаем напрямую этот файл
if (process.argv[1].includes('factory/server.js')) {
  const server = createFactoryServer();
  server.listen(3002, () => {
    console.log('🏭 Сервер Завода запущен на порту 3002');
  });
}