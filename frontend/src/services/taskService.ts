import axios from 'axios'
import { getToken } from './authService'

const API_URL = 'http://127.0.0.1:5000'

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

export const getTasks = () => {
  return axios.get(`${API_URL}/tasks`, authHeaders())
}

export const addTask = (taskData: {
  title: string
  description?: string
  status: string
  due_date?: string
}) => {
  return axios.post(`${API_URL}/tasks`, taskData, authHeaders())
}

export const deleteTask = (taskId: number) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, authHeaders())
}

export const updateTask = (taskId: number, taskData: any) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, taskData, authHeaders())
}

export const getSubtasks = (taskId: number) => {
  return axios.get(`${API_URL}/tasks/${taskId}/subtasks`, authHeaders())
}

export const addSubtask = (taskId: number, subtaskData: any) => {
  return axios.post(`${API_URL}/tasks/${taskId}/subtasks`, subtaskData, authHeaders())
}

export const deleteSubtask = (taskId: number, subtaskId: number) => {
  return axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, authHeaders())
}
