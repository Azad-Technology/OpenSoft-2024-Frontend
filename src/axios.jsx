import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.145.90.240:8000/',
});

export default instance;