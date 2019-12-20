import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.56.1:3333',
  // baseURL: 'http://172.21.2.221:3333',
});

export default api;
