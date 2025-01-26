import axios from 'axios';

const API_URL = "https://formbuilder-tspl.onrender.com/api/v1/forms";

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
export const updateForm = async (form,formId) => {
    const response = await axios.put(`${API_URL}/update/${formId}`, form, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

// export const deleteForm = async (formId) => {
//     const response = await axios.delete(`${API_URL}/delete/${formId}`);
//     return response.data;
// };

export const deleteForm = async (formId) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${formId}`);

      return response.data;
    } catch (error) {
        console.log(error);
      throw error.response.data.message || 'Delete Task failed';
    }
  };
