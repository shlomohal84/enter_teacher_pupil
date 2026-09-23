import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { PupilsProvider } from "./context/PupilsContext";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import AddPupil from "./pages/AddPupil/AddPupil";
import PupilProfile from "./pages/PupilProfile.jsx/PupilProfile";

import "./App.css";
import { useAuth } from "./hooks/useAuth";
import api from "./api/axios";
import AddAssignment from "./pages/AddAssignment/AddAssignment";
import PublicRoute from "./components/PublicRoute/PublicRoute";
function App() {
	const { setUser } = useAuth(null);
	const [loading, setLoading] = useState(true);
	const [pupils, setPupils] = useState([]);
	// Explicitly create your boolean flag using the !! operator

	useEffect(() => {
		const checkUserSession = async () => {
			try {
				const { data } = await api.get("/auth/verify-session", {
					withCredentials: true,
				});
				if (data.status && data.user) {
					setUser(data.user);
					// const pupilsResponse = await api.get("/pupils");
					// if (pupilsResponse.data) {
					// 	setPupils(pupilsResponse.data.pupils || pupilsResponse.data);
					// }
				}
			} catch (error) {
				if (error.response?.status !== 401 && error.response?.status !== 400) {
					console.log(
						"Actual infrastructure network connection error:",
						error.message,
					);
				}
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkUserSession();
	}, [setUser]);

	if (loading) {
		return (
			<div
				className="loading-screen"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<h2>Synchronizing profile session...</h2>
			</div>
		);
	}

	return (
		<div className="App">
			<Header />
			<PupilsProvider value={{ pupils, setPupils }}>
				<Routes>
					<Route element={<PublicRoute />}>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/add" element={<AddPupil />} />
						<Route path="/:id" element={<PupilProfile />} />
						<Route path="/:id/add" element={<AddAssignment />} />
					</Route>
				</Routes>
			</PupilsProvider>
			<ToastContainer />
		</div>
	);
}

export default App;
