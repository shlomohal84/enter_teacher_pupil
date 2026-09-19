import { useAuth } from "#src/hooks/useAuth.js";
import { Link } from "react-router-dom";
import PupilsList from "../../components/PupilsList/PupilsList";
// import { toast } from "react-toastify";

export default function Home() {
	const { user, logout } = useAuth();

	return (
		<div className="Home">
			<Link to="/add">Add Pupil</Link>
			<h4>
				Welcome <span>{user}</span>
			</h4>
			<PupilsList />
			<button onClick={logout}>Logout</button>
		</div>
	);
}
