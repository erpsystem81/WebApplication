import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
    (config) => {

        let token = null;

        try {
            token = sessionStorage.getItem("token");
        } catch (error) {
            console.warn(
                "Unable to access sessionStorage:",
                error
            );
        }

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;