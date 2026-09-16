import { Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import Header from "./components/Header/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
