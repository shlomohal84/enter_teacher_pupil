import { useParams } from "react-router-dom";
import { usePupils } from "#src/hooks/usePupils.js";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import api from "#src/api/axios.js";
export default function PupilProfile() {
	const { id } = useParams();
	const { pupils, setPupils } = usePupils();
	const pupil = pupils.find((p) => p._id === id);
	if (!pupils.length) return <p>Loading application data...</p>;
	if (!pupil) return <p>Student not found</p>;

	const handleDeleteAssignment = async (e, id) => {
		e.preventDefault();
		try {
			await api.delete(`/pupils/${pupil._id}/delete`, {
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
			<Button variant="contained" component={RouterLink} to={"/"} size="small">
				Back to teacher profile
			</Button>
			<h1 style={{ textAlign: "center", marginTop: "30px" }}>
				{pupil.fullName}
			</h1>
			<div className="assignments-container flex-column">
				{pupil.assignments.map((assignment) => (
					<div key={assignment._id} className="flex-row">
						<form
							style={{
								display: "flex",
								flexDirection: "row", // Keeps elements side-by-side
								alignItems: "center", // Vertically aligns the button and text midlines
								gap: "12px", // Clean spacing between button and text
								width: "100%",
							}}
							onSubmit={(e) => handleDeleteAssignment(e, assignment._id)}
						>
							<Button
								type="submit"
								size="small"
								type="submit"
								sx={{
									minWidth: "40px",
									height: "40px",
									p: 0,
									flexShrink: 0, // Crucial: Prevents the button from squeezing when text gets long
								}}
							>
								<DeleteForeverIcon color="error" fontSize="small" />
							</Button>
							<h3
								style={{
									margin: 0,
									flexGrow: 1, // Takes up all available horizontal space
									minWidth: 0, // Crucial: Tells the browser it is allowed to shrink/wrap text
									wordBreak: "break-word", // Wraps long words nicely without pushing the form structure wide
								}}
							>
								{assignment.title}
							</h3>
							<div style={{ flexGrow: 1, flexBasis: 0 }} />
						</form>
					</div>
				))}
			</div>
			<Button
				variant="contained"
				component={RouterLink}
				to={`./add`}
				size="small"
				className="flex-column"
				sx={{ justifySelf: "center", display: "flex", marginTop: "30px" }}
			>
				Add assignment
			</Button>
		</div>
	);
}
