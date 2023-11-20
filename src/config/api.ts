import axios from 'axios';

import { HOST, PORT } from './env';

export const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});
