import axios from 'axios';

// Create axios instance with base URL from .env file
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      
      console.error('API Error:', response.status, response.data);
      
      // Handle specific status codes
      if (response.status === 401) {
        console.error('Unauthorized access');
      } else if (response.status === 404) {
        console.error('Resource not found');
      } else if (response.status >= 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
