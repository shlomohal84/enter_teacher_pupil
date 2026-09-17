import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { toast } from "react-toastify";

export default function Home() {
	const navigate = useNavigate();
	const [cookies, , removeCookie] = useCookies(["token"]);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verifyCookie = async () => {
			const hasToken = cookies.token || document.cookie.includes("token=");
			if (!hasToken) {
				navigate("/login");
				return;
			}
			try {
				const { data } = await axios.post(
					"/api",
					{},
					{
						withCredentials: true,
					},
				);
				const { status, user } = data;

				if (status) {
					setUsername(user);
					// toast(`Hello ${user}`, {
					// 	position: "top-right",
					// 	toastId: `welcome-${user}`,
					// });
					setIsLoading(false);
				} else {
					await removeCookie("token", { path: "/" });
					navigate("/login");
				}
			} catch (error) {
				console.log("Verification failed", error);
				await removeCookie("token", { path: "/" });
				navigate("/login");
			}
		};
		verifyCookie();
		return;
	}, [cookies.token, navigate, removeCookie]);

	const logout = async () => {
		await removeCookie("token", { path: "/" });
		navigate("/register");
	};

	if (isLoading) {
		return <h1>Verifying session...</h1>;
	}
	return (
		<div className="Home">
			<h4>
				Welcome <span>{username}</span>{" "}
			</h4>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
