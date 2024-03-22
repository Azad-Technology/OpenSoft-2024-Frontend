import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.145.120.169:8000',
});

export default instance;