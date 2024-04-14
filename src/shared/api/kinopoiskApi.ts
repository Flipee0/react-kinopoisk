import axios from "axios";
import handleDates from "../helpers/handleDates";

const kinopoiskApi = axios.create({
    baseURL: "https://api.kinopoisk.dev/",
    headers: {"X-API-KEY": process.env.REACT_APP_TOKEN!}
});

kinopoiskApi.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);
    return originalResponse;
});

export default kinopoiskApi
