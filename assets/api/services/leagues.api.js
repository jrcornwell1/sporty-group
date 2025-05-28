import { app } from '../connections/app.connections.js';

export default {
  getAllLeagues: (params) =>
    app.get('/all_leagues.php', {
      params: params,
    }),
};
