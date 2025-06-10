import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.post['Accept'] ='application/json';
axios.defaults.headers.post['Content-Type'] ='application/json';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});