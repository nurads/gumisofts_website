import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",

    },
});

axiosInstance.interceptors.response.use((response) => {
    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
});
export default axiosInstance;