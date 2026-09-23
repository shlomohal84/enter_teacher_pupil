/* global __API_BASE__ */

import axios from "axios";

const api = axios.create({
	// Pulls from your vite.config.js definition block
	baseURL: __API_BASE__,
	// Automatically attaches cookies to ALL requests globally
	withCredentials: true,
});

export default api;
