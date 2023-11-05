import axios, { Axios } from "axios";

export const axiosInstance: Axios = axios.create({
    baseURL: "https://www.saigeapp.online",
})