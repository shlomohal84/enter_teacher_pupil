import { Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import Header from "./components/Header/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Home />} />
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
