import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.145.90.240:8080',
});

export default instance;