import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		repeatPassword: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		repeatPassword: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
			isValid = false;
		}

		if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
			isValid = false;
		}

		if (formData.password !== formData.repeatPassword) {
			newErrors.repeatPassword = "Passwords do not match";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};
	const notifySuccess = () => {
		toast.success("User is registered!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const notifyError = () => {
		toast.error("Something went wrong!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await validateForm();

			const response = await axios.post(
				"http://localhost:8080/api/users",
				{
					email: formData.email,
					password: formData.password,
				}
			);

			const { id } = response.data;
			console.log(response.data);
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
			await notifyError();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex w-full items-center justify-center h-screen flex-col'>
			{loading ? (
				<ClipLoader className='m-auto' size={100} />
			) : (
				<div className='flex w-full items-center justify-center h-screen flex-col'>
					<Header />
					<div className='bg-white p-8 rounded shadow-md w-96 m-auto'>
						<h2 className='text-2xl font-semibold mb-6'>
							Registration Form
						</h2>
						<form
							onSubmit={handleSubmit}
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

							<div>
								<label
									htmlFor='repeatPassword'
									className='block text-sm font-medium text-gray-600'>
									Repeat Password:
								</label>
								<input
									type='password'
									id='repeatPassword'
									name='repeatPassword'
									value={formData.repeatPassword}
									onChange={handleInputChange}
									className='mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full'
								/>
								<p className='text-red-500 text-sm'>
									{errors.repeatPassword}
								</p>
							</div>

							<button
								type='submit'
								className='bg-blue-500 mx-auto px-10 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
								Register
							</button>
							<Link className='mt-10 mx-auto' to='/login'>
								<button
									type='button'
									className='bg-blue-500 mx-auto px-10 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
									Sign in
								</button>
							</Link>

							{/* <link type='button' rel="stylesheet" href="" /> */}
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default RegistrationPage;
