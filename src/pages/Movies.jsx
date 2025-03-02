import { Link } from "react-router-dom";
import data from "./page_components/data";
import "./Page_scss/Movies.scss";
import { firestoreDB } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Movies = () => {
	const [error, setError] = useState("");
	const [dataDB, setDataDB] = useState([]);

	useEffect(() => {
		onSnapshot(collection(firestoreDB, "movies_two"), (snapshot) => {
			console.log(snapshot.docs[0].data());
		});
	}, []);

	return (
		<section className="movies">
			<h1>Movies</h1>
			{data.map(({ id, title }) => {
				return (
					<div key={id} className="one-movie">
						<h3>{title}</h3>
						<div>
							<Link>Více informací</Link>
							<button>Smazat</button>
						</div>
					</div>
				);
			})}
		</section>
	);
};

export default Movies;
