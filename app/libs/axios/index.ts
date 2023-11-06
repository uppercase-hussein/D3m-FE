import axios, { AxiosError }  from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000',
    // baseURL: 'http://localhost:1010',
    baseURL: 'https://goal-26ke.onrender.com',
  });


  export default instance;