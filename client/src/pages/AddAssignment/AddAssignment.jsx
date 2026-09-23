import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import api from "#src/api/axios.js";

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
			const { data } = await api.put(
				`/pupils/${id}/add`,
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
			<h1>Add Assignment</h1>
			<Button
				variant="contained"
				component={RouterLink}
				to=".."
				relative="path"
				size="small"
				sx={{ justifySelf: "center", display: "flex" }}
			>
				Back to pupil profile
			</Button>
			<form onSubmit={handleAddAssignment} className="flex-column padding-top">
				<TextField
					onChange={handleInputChange}
					type="text"
					placeholder="Assignment Description"
					label="Assignment Description"
					name="title"
					value={title}
					variant="outlined"
					required
					id="assignment-description"
				/>
				<Button type="submit" variant="contained" size="small">
					Add assignment
				</Button>
				{/* <button type="submit">Add Assignment</button> */}
			</form>
		</div>
	);
}
