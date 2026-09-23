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

		// 2. Keeps names intact during development pre-bundling
		optimizeDeps: {
			rolldownOptions: {
				output: {
					keepNames: true,
				},
			},
		},
		// 1. This handles local development interception
		server: {
			proxy: {
				"/api": {
					target: "http://localhost:5000",
					changeOrigin: true,
					secure: false,
					// rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},

		// 2. This injects a global variable accessible anywhere in your code
		define: {
			__API_BASE__: JSON.stringify(isDev ? "/api" : "https://onrender.com"),
		},
	};
});
