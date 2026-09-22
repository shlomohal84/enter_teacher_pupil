/* global __API_BASE__ */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Register/Register.module.css";
import { useAuth } from "#src/hooks/useAuth.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Login() {
	const navigate = useNavigate();
	const { setUser, isLoading } = useAuth();

	const [formData, setFormData] = useState({
		idNum: "",
		password: "",
	});
	const [localSubmitting, setLocalSubmitting] = useState(false);
	const { idNum, password } = formData;

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
				`${__API_BASE__}/auth/login`,
				{ ...formData },
				{ withCredentials: true },
			);

			const { success, message, user } = data;
			if (success) {
				handleSuccess(message);
				setFormData({ ...formData, idNum: "", password: "" });
				setUser(user);
				navigate("/");
			} else {
				handleError(message);
				setLocalSubmitting(false);
			}
		} catch (error) {
			console.log("Login component submission error", error.message);
			setLocalSubmitting(false);
		}
	};
	if (isLoading) {
		return <h1>Checking session validity...</h1>;
	}
	return (
		<div className={styles.Login}>
			<Typography variant="h3" component="h2" sx={{ textAlign: "center" }}>
				Login
			</Typography>
			<form onSubmit={handleSubmit}>
				<div className={styles["input-group"]}>
					<TextField
						type="text"
						name="idNum"
						label="ID number"
						placeholder="ID number"
						onChange={handleChange}
						required
						value={idNum}
						id="outlined-basic"
						variant="outlined"
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						placeholder="Password"
						onChange={handleChange}
						required
						value={password}
						id="outlined-basic"
						variant="outlined"
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
