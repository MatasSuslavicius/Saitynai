import axios from 'axios';
const BASE_URL = 'https://boardgamesapi1.azurewebsites.net/api';
//http://localhost:5150/api

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});