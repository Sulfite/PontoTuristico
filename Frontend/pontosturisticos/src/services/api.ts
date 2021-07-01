import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:44386/api/",
    headers: {
        'Access-Control-Allow-Origin': true,
    },
});