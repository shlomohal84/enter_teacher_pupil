import axios from "axios";
import { useState } from "react";

export default function AddPupil() {
	const [formData, setFormData] = useState({
		idNum: "aaaa",
		fullName: "aaa aaaa",
		cSharp: "1",
		fullstack: "1",
		finalProject: "1",
	});
	const { idNum, fullName, cSharp, fullstack, finalProject } = formData;

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAddPupil = async (e) => {
		e.preventDefault();
		const pupilData = {
			idNum: idNum,
			fullName: fullName,
			grades: [
				{
					cSharp: formData.cSharp,
					fullstack: formData.fullstack,
					finalProject: formData.finalProject,
				},
			],
		};
		try {
			console.log(
				"PAYLOAD BEING SENT TO SERVER:",
				JSON.stringify(pupilData, null, 2),
			);

			const { data } = await axios.post("api/pupils/add", pupilData, {
				withCredentials: true,
			});
			console.log(data);
		} catch (error) {
			console.error(error.response?.data.message);
		}
	};
	return (
		<div className="AddPupil">
			<h1>Add Pupil</h1>

			<form onSubmit={handleAddPupil} className="form-container flex-column">
				<input
					onChange={handleInputChange}
					value={idNum}
					type="text"
					name="idNum"
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
