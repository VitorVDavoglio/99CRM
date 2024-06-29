import axios from "axios";

const URL = "http://localhost:3001";

const api = axios.create({
        baseURL: URL,
        auth: {
            username: "root",
            password: "admin"
        }
})

export default api;