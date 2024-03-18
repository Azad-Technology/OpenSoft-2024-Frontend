import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.145.65.205:8000',
});

export default instance;