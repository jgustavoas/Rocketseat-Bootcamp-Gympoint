import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.56.1:3333',
  // IP do dispositivo Android virtual usado nos testes,
});

export default api;
