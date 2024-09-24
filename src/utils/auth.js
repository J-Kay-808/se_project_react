export const BASE_URL = "http://localhost:3001";
import { request } from "./Api";


// SignUp
export const register = (name, password, email, avatar) => {
    return request(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password }),
    });
};


// signIn
export const authorize = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
};