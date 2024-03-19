import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://52.170.17.9/8002',
});

export default instance;