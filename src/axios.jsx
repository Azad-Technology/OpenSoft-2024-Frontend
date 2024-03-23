import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://opensoft.rajivharlalka.in'
});

export default instance;
