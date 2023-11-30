import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { BasketProvider } from "../BasketProvider";
import BasketIcon from "../BasketIcon";
function Layout() {
	return (
		<div className='flex flex-col w-full'>
			<Header />
			<Outlet />
			<BasketIcon />
		</div>
	);
}

export default Layout;
