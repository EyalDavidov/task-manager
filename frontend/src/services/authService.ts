import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

export const signup = async (email: string, username: string, password: string) => {
  return axios.post(`${API_URL}/signup`, { email, username, password })
}

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password })
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}
