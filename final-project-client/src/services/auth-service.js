import axios from "axios";
const API_URL = "http://localhost:4000/api"
const api = axios.create({withCredentials: true})

export const signup = async (username, password, role) => {
    console.log('attempting signup with following values ')
    console.log('username ', username)
    console.log('password ', password)
    console.log('role ', role)
    const response = await api.post(`${API_URL}/signup`, {username, password, role})
    return response.data
}

export const signin = async (username, password) => {
    console.log('inside signin method');
    const response = await api.post(`${API_URL}/signin`,
        {username, password})
    console.log('response to signin: ', response);
    return response.data
}

export const profile = async () => {
    const response = await api.post(`${API_URL}/profile`)
    return response.data
}

export const logout = async () => {
    const response = await api.post(`${API_URL}/logout`)
    return response.data
}