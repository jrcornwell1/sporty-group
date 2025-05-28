import axios from 'axios';

const baseUrl = 'https://www.thesportsdb.com/api/v1/json';
const key = '/3';

export const app = axios.create({
  baseURL: baseUrl + key,
});

app.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);
