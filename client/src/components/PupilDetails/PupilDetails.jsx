import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { usePupils } from "#src/hooks/usePupils.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
export default function PupilDetails({ idNum, fullName, _id }) {
	const { setPupils } = usePupils();
	const handleDeletePupil = async () => {
		try {
			await axios.delete("/api/pupils", {
				data: { pupilId: _id },
				withCredentials: true,
			});
			setPupils((prevState) => prevState.filter((pupil) => pupil._id != _id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="PupilDetails" style={{ textAlign: "center" }}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography
						gutterBottom
						sx={{ color: "text.secondary", fontSize: 14 }}
					>
						ID Number: {idNum}
					</Typography>
					<Typography variant="h5" component="div">
						{fullName}
					</Typography>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button
						variant="contained"
						component={RouterLink}
						to={"/" + _id}
						size="small"
					>
						Show Pupil
					</Button>
					<Button
						color="error"
						size="small"
						variant="contained"
						onClick={handleDeletePupil}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
