import { useState, useEffect } from "react";
import axios from "axios";

import PupilDetails from "../PupilDetails/PupilDetails";

export default function PupilsList() {
	const [pupils, setPupils] = useState([]);
	useEffect(() => {
		const getPupils = async () => {
			try {
				const { data } = await axios.post(
					"/api/pupils",
					{},
					{ withCredentials: true },
				);
				setPupils(data.pupils);
			} catch (error) {
				console.log(error.message);
			}
		};
		getPupils();
	}, [setPupils]);

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
