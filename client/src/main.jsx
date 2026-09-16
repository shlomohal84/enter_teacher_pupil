import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</BrowserRouter>
	</StrictMode>,
);
