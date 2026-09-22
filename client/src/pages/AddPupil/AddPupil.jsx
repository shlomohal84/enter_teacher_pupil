import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function AddPupil() {
	const { setPupils } = usePupils();

	const [formData, setFormData] = useState({
		idNum: "",
		fullName: "",
	});
	const { idNum, fullName } = formData;
	const navigate = useNavigate();
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAddPupil = async (e) => {
		e.preventDefault();
		const pupilData = {
			idNum: idNum,
			fullName: fullName,
		};
		try {
			const { data } = await axios.post("api/pupils/add", pupilData, {
				withCredentials: true,
			});
			setPupils((prevState) => [...prevState, data.pupil]);
			navigate("/");
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || error.message || "An error occured";
			console.log(errorMessage);
		}
	};
	return (
		<div className="AddPupil">
			<h1 style={{ textAlign: "center" }}>Add Pupil</h1>
			<Button variant="contained" component={RouterLink} to={"/"} size="small">
				Back to teacher profile
			</Button>
			<form onSubmit={handleAddPupil} className="form-container flex-column">
				<TextField
					onChange={handleInputChange}
					value={idNum}
					type="text"
					name="idNum"
					placeholder="ID number"
					label="ID number"
					id="outlined-basic"
					variant="outlined"
					required
				/>
				<TextField
					onChange={handleInputChange}
					value={fullName}
					type="text"
					name="fullName"
					placeholder="Full name"
					required
					label="Full name"
					id="outlined-basic"
					variant="outlined"
				/>
				<Button type="submit" variant="contained" size="small">
					Add Pupil
				</Button>
			</form>
		</div>
	);
}
