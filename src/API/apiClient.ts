import axios from "axios";
import { API_URL } from "../constants/constants";

console.log("API URL is ", API_URL);
const apiClient = axios.create({
    baseURL: API_URL,
});

export default apiClient;
