import axios from "axios";
import { useState } from "react";

export default function AddPupil() {
	const [formData, setFormData] = useState({
		id: "",
		fullName: "",
		cSharp: "",
		fullstack: "",
		finalProject: "",
	});
	const { id, fullName, cSharp, fullstack, finalProject } = formData;
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAddPupil = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"api/pupils/add",
				{ id, fullName, cSharp, fullstack, finalProject },
				{ withCredentials: true },
			);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="AddPupil">
			<h1>Add Pupil</h1>

			<form onSubmit={handleAddPupil} className="form-container flex-column">
				<input
					onChange={handleInputChange}
					value={id}
					type="text"
					name="id"
					placeholder="ID number"
				/>
				<input
					onChange={handleInputChange}
					value={fullName}
					type="text"
					name="fullName"
					placeholder="FullName"
				/>
				<input
					onChange={handleInputChange}
					value={cSharp}
					type="text"
					name="cSharp"
					placeholder="C#"
				/>
				<input
					onChange={handleInputChange}
					value={fullstack}
					type="text"
					name="fullstack"
					placeholder="Fullstack"
				/>
				<input
					onChange={handleInputChange}
					value={finalProject}
					type="text"
					name="finalProject"
					placeholder="Final Project"
				/>
				<button type="submit">Add Pupil</button>
			</form>
		</div>
	);
}
