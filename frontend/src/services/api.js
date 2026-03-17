import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Create an axios instance with your backend URL from config
const api = axios.create({
    baseURL: API_BASE_URL, // This will change based on environment
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to check symptoms
export const checkSymptoms = async (symptomList) => {
    try {
        const response = await api.post('/api/check-symptoms', symptomList);
        return response.data;
    } catch (error) {
        console.error('Error checking symptoms:', error);
        throw error;
    }
};

// Function to fetch all symptoms (for the dropdown)
export const fetchSymptoms = async () => {
    try {
        const response = await api.get('/api/symptoms');
        return response.data;
    } catch (error) {
        console.error('Error fetching symptoms:', error);
        throw error;
    }
};

export default api;