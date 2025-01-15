let process = {
    env: {
        REACT_APP_API_URL: 'http://localhost:8080/api'
    }
};
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    TIMEOUT: 5000,
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
    }
};