import { app } from '../connections/app.connections.js';

export default {
  getExample: (params) =>
    app.get('/example', {
      params: params,
    }),
};
