import axios from 'axios';

// Configuracion por defecto para AXIOS
export default axios.create({
  baseURL: 'https://randomuser.me/api',
  responseType: 'json',
  timeout: 6000
});