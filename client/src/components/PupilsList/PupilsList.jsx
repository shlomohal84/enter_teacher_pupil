// import { useEffect } from "react";
import { usePupils } from "#src/hooks/usePupils.js";
import Button from "@mui/material/Button";
import PupilDetails from "../PupilDetails/PupilDetails";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function PupilsList() {
	const { pupils } = usePupils();
	return (
		<div className="PupilsList padding-top">
			<Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
				Pupils
			</Typography>
			<div className="button-wrapper-center padding-top">
				<Button variant="contained" color="success" to="/add" component={Link}>
					Add Pupil
				</Button>
			</div>
			<div className="flex-column">
				{pupils.map((pupil) => (
					<div key={pupil.idNum}>
						<PupilDetails {...pupil} />
					</div>
				))}
			</div>
		</div>
	);
}
