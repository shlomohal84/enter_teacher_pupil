// import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";
import axios from "axios";

export default function PupilProfile() {
	const { id } = useParams();
	const { pupils, setPupils } = usePupils();
	const pupil = pupils.find((p) => p._id === id);
	if (!pupils.length) return <p>Loading application data...</p>;
	if (!pupil) return <p>Student not found</p>;

	const handleDeleteAssignment = async (e, id) => {
		e.preventDefault();
		try {
			await axios.delete(`/api/pupils/${pupil._id}/delete`, {
				data: { assignmentId: id },
				withCredentials: true,
			});
			setPupils((prevState) => {
				return prevState.map((p) => {
					if (p._id === pupil._id) {
						return {
							...p,
							assignments: p.assignments.filter(
								(assignment) => assignment._id !== id,
							),
						};
					}
					return p;
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="PupilProfile">
			<Link to="/">Back to teacher profile</Link>
			<h1>
				{pupil.idNum} - {pupil.fullName}
			</h1>
			<div className="assignments-container">
				{pupil.assignments.map((assignment) => (
					<div key={assignment._id} className="flex-row">
						<span>{assignment.title}</span>
						<form onSubmit={(e) => handleDeleteAssignment(e, assignment._id)}>
							<button type="submit">x</button>
						</form>
					</div>
				))}
			</div>
			<Link to="./add">Add Assignment</Link>
		</div>
	);
}
