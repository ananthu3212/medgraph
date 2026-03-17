// API configuration
const getApiBaseUrl = () => {
  // In development, use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:8081';
  }

  // In production (Docker), use the environment variable or backend service name
  return import.meta.env.VITE_API_URL || 'http://backend:8080';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};