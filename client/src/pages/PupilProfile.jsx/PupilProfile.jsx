// import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";

export default function PupilProfile() {
	const { id } = useParams();
	const { pupils } = usePupils();

	const pupil = pupils.find((p) => p._id === id);
	if (!pupils.length) return <p>Loading application data...</p>;
	if (!pupil) return <p>Student not found</p>;
	console.log(pupil);
	return (
		<div className="PupilProfile">
			<Link to="/">Back to teacher profile</Link>
			<h1>
				{pupil.fullName} {pupil.idNum}
			</h1>
		</div>
	);
}
