import { Link } from "react-router-dom";

export default function PupilDetails({ idNum, fullName /* , grades */, _id }) {
	return (
		<div className="PupilDetails" style={{ textAlign: "center" }}>
			<h3>
				{fullName} (ID# {idNum})
			</h3>

			<div className="grades-container">
				{/* {grades.map((grade) => (
					<div
						className="grade-wrapper"
						key={idNum}
						style={{
							display: "flex",
							gap: "5px",
							textAlign: "center",
							border: "1px solid black",
						}}
					>
						{Object.entries(grade).map((g) => (
							<div key={g}>
								<p>{g[0]}</p>
								<p>{g[1]}</p>
							</div>
						))}
					</div>
				))} */}
				<div>
					<Link to={"/" + _id}>Show Pupil</Link>
				</div>
			</div>
		</div>
	);
}
