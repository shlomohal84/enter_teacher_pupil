import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useCallback } from "react";
import { AuthContext } from "../hooks/useAuth";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [cookies, , removeCookie] = useCookies(["token"]);

	const logout = useCallback(async () => {
		try {
			await axios.post("/api/logout", {}, { withCredentials: true });
		} catch (error) {
			console.log("Backend failed to logout:", error);
		} finally {
			await removeCookie("token", { path: "/" });
			setUser(null);
		}
	}, [removeCookie]);

	useEffect(() => {
		const verifyUser = async () => {
			if (user) {
				setIsLoading(false);
				return;
			}
			const hasToken = cookies.token || document.cookie.includes("token=");
			if (!hasToken) {
				setUser(null);
				setIsLoading(false);
				return;
			}

			try {
				const { data } = await axios.post(
					"/api/auth/verify-session",
					{},
					{ withCredentials: true },
				);
				if (data.status) {
					setUser(data.user);
				} else {
					await logout();
				}
			} catch (error) {
				console.log("Auth verification failed", error);
				await logout();
			} finally {
				setIsLoading(false);
			}
		};
		verifyUser();
	}, [cookies.token, logout, user]);

	return (
		<AuthContext.Provider value={{ user, isLoading, logout, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}
