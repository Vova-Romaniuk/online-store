import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (!formData.email.trim()) {
			newErrors.email = "Please enter your email";
			isValid = false;
		}

		if (!formData.password.trim()) {
			newErrors.password = "Please enter your password";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await validateForm();

			const response = await axios.post(
				"http://localhost:8080/api/users/login",
				{
					email: formData.email,
					password: formData.password,
				}
			);

			const { id } = response.data;
			localStorage.setItem("userId", JSON.stringify(id));
			await navigate("/");
			await notifySuccess();
		} catch (error) {
			if (error.response) {
				const serverErrors = error.response.data;
				setErrors(serverErrors);
				console.log("Server errors:", serverErrors);
			} else {
				console.error("Error:", error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex w-full items-center justify-center h-screen flex-col'>
			{loading ? (
				<ClipLoader />
			) : (
				<div className='flex w-full items-center justify-center h-screen flex-col'>
					<Header />
					<div className='bg-white p-8 rounded shadow-md w-96 m-auto'>
						<h2 className='text-2xl font-semibold mb-6'>
							Login Form
						</h2>
						<form
							onSubmit={handleLogin}
							className='space-y-4 flex flex-col'>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-600'>
									Email:
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									className='mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full'
								/>
								<p className='text-red-500 text-sm'>
									{errors.email}
								</p>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-600'>
									Password:
								</label>
								<input
									type='password'
									id='password'
									name='password'
									value={formData.password}
									onChange={handleInputChange}
									className='mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full'
								/>
								<p className='text-red-500 text-sm'>
									{errors.password}
								</p>
							</div>

							<button
								type='submit'
								className='bg-blue-500 text-white m-auto p-2 px-10 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
								Login
							</button>
							<Link className='mt-10 mx-auto' to='/registration'>
								<button
									type='button'
									className='bg-blue-500 mx-auto px-10 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
									Sign up
								</button>
							</Link>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginPage;
