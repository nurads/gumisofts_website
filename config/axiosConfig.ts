import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// If NEXT_PUBLIC_API_URL is set, use it (for external backend).
// Otherwise default to this Next.js app's own /api routes.
const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
        response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
});

export default axiosInstance;
