import {API_CONFIG} from "../config/api.config.js";

class ApiService {
    static instance = null;

    static getInstance() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return await response.json();
    }

    getFullUrl(endpoint, params, queryParams) {
        let url = `${API_CONFIG.BASE_URL}${endpoint}`;

        // Replace URL parameters
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url = url.replace(`:${key}`, value);
            });
        }

        // Add query parameters
        if (queryParams) {
            const queryString = new URLSearchParams(queryParams).toString();
            url = `${url}?${queryString}`;
        }

        return url;
    }

    async get(endpoint, params, queryParams) {
        const url = this.getFullUrl(endpoint, params, queryParams);
        const response = await fetch(url, {
            headers: API_CONFIG.DEFAULT_HEADERS,
        });
        return this.handleResponse(response);
    }

    async post(endpoint, body, params, queryParams) {
        const url = this.getFullUrl(endpoint, params, queryParams);
        const response = await fetch(url, {
            method: 'POST',
            headers: API_CONFIG.DEFAULT_HEADERS,
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    }

    async delete(endpoint, params, queryParams) {
        const url = this.getFullUrl(endpoint, params, queryParams);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: API_CONFIG.DEFAULT_HEADERS,
        });
        return this.handleResponse(response);
    }
}

export const apiService = ApiService.getInstance();
