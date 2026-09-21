import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";
export default function AddPupil() {
	const { setPupils } = usePupils();

	const [formData, setFormData] = useState({
		idNum: "001",
		fullName: "John Doe",
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
				<button type="submit">Add Pupil</button>
			</form>
		</div>
	);
}
