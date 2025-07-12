import Config from 'react-native-config';

import axios from 'axios';
import { URLS } from '../constants';

export const axiosInstance = axios.create({
  baseURL: URLS.BASE,
  headers: {
    Accept: 'application/json',
    'x-api-key': Config.API_KEY,
    'Content-Type': 'application/json',
  },
});

export const setupNetwork = async () => {
  axiosInstance.interceptors.request.use(
    async config => {
      return Promise.resolve(config);
    },
    error => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    async error => {
      return Promise.reject(error);
    },
  );
};
