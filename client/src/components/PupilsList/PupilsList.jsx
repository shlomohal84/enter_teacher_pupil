// import { useEffect } from "react";
import { usePupils } from "#src/hooks/usePupils.js";
import PupilDetails from "../PupilDetails/PupilDetails";

export default function PupilsList() {
	const { pupils } = usePupils();
	return (
		<div className="PupilsList">
			<h3>PupilsList</h3>
			<div className="pupils">
				{pupils.map((pupil) => (
					<div key={pupil.idNum}>
						<PupilDetails {...pupil} />
					</div>
				))}
			</div>
		</div>
	);
}
