import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "#src/hooks/useAuth.js";

export default function PublicRoute() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <h1>Verifying Session...</h1>;
	}
	if (user) {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
}
