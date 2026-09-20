// import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";

export default function PupilProfile() {
	const { id } = useParams();
	const { pupils } = usePupils();

	const pupil = pupils.find((p) => p._id === id);
	if (!pupils.length) return <p>Loading application data...</p>;
	if (!pupil) return <p>Student not found</p>;

	return (
		<div className="PupilProfile">
			<Link to="/">Back to teacher profile</Link>
			<h1>
				{pupil.idNum} - {pupil.fullName}
			</h1>
			<div className="assignments-container">
				{pupil?.assignments.map((assignment) => (
					<div className="flex-row" key={assignment._id}>
						<input type="checkbox" />
						<span>{assignment.title}</span>
					</div>
				))}
			</div>
		</div>
	);
}
