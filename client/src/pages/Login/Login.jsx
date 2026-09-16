import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Register/Register.module.css";

export default function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "shlomo@halperin.com",
		password: "1234",
	});

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
		try {
			const { data } = await axios.post(
				"/api/auth/login",
				{ ...formData },
				{ withCredentials: true },
			);
			console.log(data);
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
				setFormData({ ...formData, email: "", password: "" });

				setTimeout(() => {
					navigate("/");
				}, 1000);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
}
