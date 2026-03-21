import axios from "axios"

const BASE_URL = "http://localhost:8080/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("nexora_token")
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("nexora_token")
            window.location.href = "/auth/login"
        }
        return Promise.reject(error)
    }
)

export const authApi = {
    login: async (data: { email: string; password: string }) => {
        const res = await axiosInstance.post("/auth/login", data)
        return res.data
    },

    getMe: async () => {
        const res = await axiosInstance.get("/auth/me")
        return res.data
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout")
    },
}