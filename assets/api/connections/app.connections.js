import axios from 'axios';

const baseUrl = '';

export const app = axios.create({
  baseURL: baseUrl,
});

app.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);
