import { createApplication } from '../../index.js';
import { setupPoolRoutes } from './routes.js';

export const createPoolServer = () => {
  const app = createApplication();
  
  app.use((req, res, next) => {
    console.log(`[POOL] ${req.method} ${req.url}`);
    next();
  });
  
  setupPoolRoutes(app);
  
  return app;
};

if (process.argv[1].includes('pool/server.js')) {
  const server = createPoolServer();
  server.listen(3001, () => {
    console.log('🏊 Сервер Бассейна запущен на порту 3001');
  });
}