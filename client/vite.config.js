import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
	// Check if we are running 'npm run dev' or building for production
	const isDev = command === "serve";

	return {
		plugins: [react()],
		build: {
			rolldownOptions: {
				output: {
					keepNames: true, // Prevents function/component name mangling
				},
			},
		},

		// Keeps names intact during development pre-bundling
		optimizeDeps: {
			rolldownOptions: {
				output: {
					keepNames: true,
				},
			},
		},

		// Handles local development proxy interception
		server: {
			proxy: {
				"/api": {
					target: "http://127.0.0.1:5000", // 127.0.0.1 prevents internal Vite 8 DNS lookup lags
					changeOrigin: true,
					secure: false,
					// UNCOMMENT THIS: Stretches compatibility if your backend routing lacks an explicit "/api" prefix
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},

		// Injects a global variable accessible anywhere in your code
		define: {
			__API_BASE__: JSON.stringify(
				// If your production backend uses a route prefix, change the string below to "https://onrender.com"
				isDev ? "/api" : "https://enter-teacher-pupil.onrender.com",
			),
		},
	};
});
