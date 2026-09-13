import { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "shlomoh",
		email: "shlomo@halperin.com",
		password: "1234",
	});

	const { name, email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = { headers: { "Content-Type": "application/json" } };

			const response = await axios.post("/api/auth/register", formData, config);
			console.log(response.data.message);
		} catch (error) {
			console.log(error.response.data.error);
		}
		// alert("Registred successfully!");
	};

	return (
		<form className={styles.Register} onSubmit={handleSubmit}>
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
				<button type="submit">Register</button>
			</div>
		</form>
	);
}
