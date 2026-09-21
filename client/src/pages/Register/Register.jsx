import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Register.module.css";

export default function Register() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "Shlomo H.",
		idNum: "001",
		password: "1234",
	});

	const { name, idNum, password } = formData;

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
				"/api/auth/register",
				{ ...formData },
				{ withCredentials: true },
			);
			const { success, message } = data;

			if (success) {
				handleSuccess(message);
				setTimeout(() => {
					navigate("/");
				}, 1000);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error);
		}
		setFormData({ ...formData, idNum: "", password: "", name: "" });
	};

	return (
		<div className={styles.Register}>
			<form onSubmit={handleSubmit}>
				<div className={styles["input-group"]}>
					<input
						type="text"
						name="name"
						placeholder="name"
						onChange={handleChange}
						required
						value={name}
					/>
					<input
						type="text"
						name="idNum"
						placeholder="ID number"
						onChange={handleChange}
						required
						value={idNum}
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
					<button type="submit">Register</button>
				</div>
			</form>
		</div>
	);
}
