import { NavLink } from "react-router-dom";
import "./Navbar.scss"

const navbar = () => {
	return (
		<nav className="navbar">
			<NavLink to={"/"} end>Home</NavLink>
			<NavLink to={"/movies"} end>Movies</NavLink>
			<NavLink to={"/addmovie"} end>AddMovie</NavLink>
		</nav>
	);
};

export default navbar;
