import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://52.170.17.9/80',
});

export default instance;