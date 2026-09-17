import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute() {
	const { user, isLoading } = useAuth();
	if (isLoading) {
		return <h1>Verifying Session...</h1>;
	}
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
}
