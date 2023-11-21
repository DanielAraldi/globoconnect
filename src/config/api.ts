import axios from 'axios';

import { HOST, PORT } from './env';

export const ITENS_LIMIT_BY_PAGE = 20;

export const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});
