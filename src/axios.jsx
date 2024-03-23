import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.105.12.4:8000/'
});

export default instance;
