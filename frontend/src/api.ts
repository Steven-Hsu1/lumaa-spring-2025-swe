import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerUser = async (username: string, password: string) => {
    return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username: string, password: string) => {
    return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getTasks = async (token: string) => {
    return await axios.get(`${API_URL}/dashboard/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createTask = async (token: string, title: string, description: string) => {
    return await axios.post(`${API_URL}/dashboard/tasks`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (token: string, id: number, title: string, description: string, isComplete: boolean) => {
    return await axios.put(`${API_URL}/dashboard/tasks/${id}`, { title, description, isComplete }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteTask = async (token: string, id: number) => {
    return await axios.delete(`${API_URL}/dashboard/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}; 