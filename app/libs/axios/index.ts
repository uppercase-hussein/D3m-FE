import axios, { AxiosError }  from 'axios';

const instance = axios.create({
    baseURL: 'https://goal-26ke.onrender.com',
  });


  export default instance;