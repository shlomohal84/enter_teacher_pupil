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
import axios from "axios";
import AddAssignment from "./pages/AddAssignment/AddAssignment";
import PublicRoute from "./components/PublicRoute/PublicRoute";
function App() {
	const [pupils, setPupils] = useState([]);
	const [loadingPupils, setLoadingPupils] = useState(true);

	const { user, isLoading: authLoading } = useAuth();
	// Explicitly create your boolean flag using the !! operator

	useEffect(() => {
		if (authLoading || !user) return;

		const getPupils = async () => {
			try {
				setLoadingPupils(true);
				const { data } = await axios.get("/api/pupils", {
					withCredentials: true,
				});
				setPupils(data.pupils || []);
			} catch (error) {
				console.error("Failed to bootstrap application data:", error);
			} finally {
				setLoadingPupils(false);
			}
		};
		getPupils();
	}, [user, authLoading]);

	useEffect(() => {
		if (authLoading || user) return;
		const timeoutId = setTimeout(() => {
			if (pupils.length > 0) {
				setPupils([]);
			}
			if (loadingPupils !== false) {
				setLoadingPupils(false);
			}
		}, 0);
		return () => clearTimeout(timeoutId);
	}, [user, authLoading, pupils.length, loadingPupils]);

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
