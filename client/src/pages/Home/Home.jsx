import { useAuth } from "#src/hooks/useAuth.js";
import PupilsList from "../../components/PupilsList/PupilsList";
import Typography from "@mui/material/Typography";
// import { toast } from "react-toastify";

export default function Home() {
	const { user } = useAuth();

	return (
		<div className="Home">
			<Typography variant="h3" component="h2" sx={{ textAlign: "center" }}>
				Hello {user}
			</Typography>

			<PupilsList />
		</div>
	);
}
