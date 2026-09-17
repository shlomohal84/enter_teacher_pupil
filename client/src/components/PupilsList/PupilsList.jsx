import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AuthContext } from "#src/hooks/useAuth.js";
import { useAuth } from "#src/hooks/useAuth.js";

export default function PupilsList() {
	const { user, logout } = useAuth();
	return <div>PupilsList</div>;
}
