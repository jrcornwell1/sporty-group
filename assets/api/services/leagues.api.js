import { app } from '../connections/app.connections.js';

export default {
  getAllLeagues: (params) =>
    app.get('/all_leagues.php', {
      params: params,
    }),

  getSelectedSeasonsBadges: (params) =>
    app.get('/search_all_seasons.php', {
      params: params,
    }),
};
