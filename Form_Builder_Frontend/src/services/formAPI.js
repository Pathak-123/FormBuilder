import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/forms";

// Fetch all forms
export const getForms = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new form
export const createForm = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/createForm`, form);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Create Form failed';
    }
};



// Fetch a specific form by ID
export const getForm = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Update an existing form by ID
export const updateForm = async (id, form) => {
    const response = await axios.put(`${API_URL}/update/${id}`, form, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};
