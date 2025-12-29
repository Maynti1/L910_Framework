import { Application } from './framework/application.js';

export const createApplication = () => {
  return new Application();
};

export const app = createApplication;
export { Application };