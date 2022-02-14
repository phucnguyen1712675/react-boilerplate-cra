import axios from 'axios';
import config from 'config';

const axiosClient = axios.create({
  baseURL: config.BASE_URL,
});

export default axiosClient;
