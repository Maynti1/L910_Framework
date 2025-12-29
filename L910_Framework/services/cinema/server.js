import { createApplication } from '../../index.js';
import { setupCinemaRoutes } from './routes.js';

export const createCinemaServer = () => {
  const app = createApplication();
  
  app.use((req, res, next) => {
    console.log('[CINEMA] ${req.method} ${req.url}');
    next();
  });
  
  setupCinemaRoutes(app);
  
  return app;
};

if (process.argv[1].includes('cinema/server.js')) {
  const server = createCinemaServer();
  server.listen(3002, () => {
    console.log('🎬 Сервер Кинотеатра запущен на порту 3002');
  });
}