import { useAuth } from "#src/hooks/useAuth.js";
import PupilsList from "../../components/PupilsList/PupilsList";
// import { toast } from "react-toastify";

export default function Home() {
	const { user, logout } = useAuth();
	// const handle
	return (
		<div className="Home">
			<h4>
				Welcome <span>{user}</span>
			</h4>
			<PupilsList />
			<button onClick={logout}>Logout</button>
		</div>
	);
}
