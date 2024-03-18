import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.145.17.202:8002',
});

export default instance;