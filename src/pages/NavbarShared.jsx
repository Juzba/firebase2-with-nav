import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./page_components/Navbar";
import Footer from "./page_components/Footer";

const NavbarShared = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default NavbarShared;
