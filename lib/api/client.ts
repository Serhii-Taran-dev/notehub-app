import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
