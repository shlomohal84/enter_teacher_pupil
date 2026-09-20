import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Register/Register.module.css";
import { useAuth } from "#src/hooks/useAuth.js";

export default function Login() {
	const navigate = useNavigate();
	const { setUser, isLoading } = useAuth();

	const [formData, setFormData] = useState({
		email: "shlomo@halperin.com",
		password: "1234",
	});
	const [localSubmitting, setLocalSubmitting] = useState(false);
	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleError = (err) => {
		toast.error(err, {
			position: "bottom-left",
		});
	};

	const handleSuccess = (msg) => {
		toast.success(msg, {
			position: "bottom-right",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLocalSubmitting(true);
		try {
			const { data } = await axios.post(
				"/api/auth/login",
				{ ...formData },
				{ withCredentials: true },
			);
			const { success, message, user } = data;
			if (success) {
				handleSuccess(message);
				setFormData({ ...formData, email: "", password: "" });
				setUser(user);
				navigate("/");
			} else {
				handleError(message);
				setLocalSubmitting(false);
			}
		} catch (error) {
			console.log("Login component submission error", error);
			setLocalSubmitting(false);
		}
	};
	if (isLoading) {
		return <h1>Checking session validity...</h1>;
	}
	return (
		<div className={styles.Login}>
			<form onSubmit={handleSubmit}>
				<div className={styles["input-group"]}>
					<input
						type="text"
						name="email"
						placeholder="Email"
						onChange={handleChange}
						required
						value={email}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
						required
						value={password}
					/>
				</div>
				<div className={styles["submit-wrapper"]}>
					<button type="submit" disabled={localSubmitting}>
						{localSubmitting ? "Logging in..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
}
