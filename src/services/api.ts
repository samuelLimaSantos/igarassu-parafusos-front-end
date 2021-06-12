import axios from 'axios';

// const baseURL = 'http://localhost:3333';
const baseURL = 'https://igarassu-parafusos.herokuapp.com';

const api = axios.create({
  baseURL,
});

export default api;
