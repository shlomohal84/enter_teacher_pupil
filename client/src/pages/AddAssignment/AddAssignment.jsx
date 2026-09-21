import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";

export default function AddAssignment() {
	const [formData, setFormData] = useState({ title: "" });
	const { title } = formData;
	const { id } = useParams();
	const { setPupils } = usePupils();

	const navigate = useNavigate();
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAddAssignment = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`/api/pupils/${id}/add`,
				{ title },
				{ withCredentials: true },
			);
			console.log(data.newAssignment._id);

			setPupils((prevState) =>
				prevState.map((pupil) => {
					if (pupil._id === id) {
						return {
							...pupil,
							assignments: [...(pupil.assignments || []), data.newAssignment],
						};
					}
					return pupil;
				}),
			);

			navigate("..", { relative: "path" });
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || error.message || "An error occured";
			console.log(errorMessage);
		}
	};

	return (
		<div>
			<h1>AddAssignment</h1>
			<form onSubmit={handleAddAssignment} className="flex-column">
				<input
					onChange={handleInputChange}
					type="text"
					placeholder="Assignment"
					name="title"
					value={title}
				/>
				<button type="submit">Add Assignment</button>
			</form>
		</div>
	);
}
