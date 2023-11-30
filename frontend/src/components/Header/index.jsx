import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Header = () => {
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userId");
		navigate("/registration");
	};
	useEffect(() => {
		console.log(userId);
	}, []);
	return (
		<header className='flex items-center w-full justify-between p-4 bg-blue-500 text-white'>
			<div className='text-xl font-bold'>My apple store</div>
			<nav>
				{!userId ? (
					<>
						<Link to='/login' className='mr-4 hover:underline'>
							Sign In
						</Link>
						<Link to='/registration' className='hover:underline'>
							Sign Up
						</Link>
					</>
				) : (
					<>
						<Link to='/home' className='mr-4 hover:underline'>
							Home
						</Link>
						<button
							onClick={handleLogout}
							className='hover:underline cursor-pointer'>
							Logout
						</button>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
