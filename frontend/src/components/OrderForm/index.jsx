import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../BasketProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderForm = () => {
	const { clearBasket } = useBasket();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: "",
		email: "",
		phoneNumber: "",
	});

	const [errors, setErrors] = useState({
		firstName: "",
		email: "",
		phoneNumber: "",
	});
	const notifySuccess = () => {
		toast.success("Order confirmed!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const notifyError = () => {
		toast.error("Something went wrong!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (!formData.firstName.trim()) {
			newErrors.firstName = "Please enter your first name";
			isValid = false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
			isValid = false;
		}

		const phoneRegex = /^\d{9}$/;
		if (!phoneRegex.test(formData.phoneNumber)) {
			newErrors.phoneNumber = "Please enter a valid 9-digit phone number";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			clearBasket();
			navigate("/");
			notifySuccess();
		} else {
			notifyError();
		}
	};

	return (
		<div className='w-full relative h-screen bg-gray-100 flex items-center justify-center'>
			<Link className='absolute top-10 left-10' to='/'>
				<Button>Повернутися на головну</Button>
			</Link>
			<div className='bg-white p-8 rounded shadow-md flex flex-col'>
				<h2 className='w-11/12 mx-auto text-2xl font-semibold mb-6'>
					Order Form
				</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 w-72 flex flex-col'>
					<div className='w-11/12 mx-auto'>
						<label
							htmlFor='firstName'
							className='block text-sm font-medium text-gray-600'>
							First Name:
						</label>
						<Input
							type='text'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleInputChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500'
						/>
						<p className='text-red-500 text-sm'>
							{errors.firstName}
						</p>
					</div>

					<div className='w-11/12 mx-auto'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-600'>
							Email:
						</label>
						<Input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500'
						/>
						<p className=' text-red-500 text-sm'>{errors.email}</p>
					</div>

					<div className='w-11/12 mx-auto'>
						<label
							htmlFor='phoneNumber'
							className='block text-sm font-medium text-gray-600'>
							Phone Number:
						</label>
						<div className='flex'>
							<div className='bg-blue-500 mt-1 rounded-tl rounded-bl text-white flex items-center px-2'>
								<span>+380</span>
							</div>
							<Input
								type='tel'
								id='phoneNumber'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleInputChange}
								className='mt-1 w-full p-2 border rounded-tr rounded-br focus:outline-none focus:border-blue-500'
							/>
						</div>

						<p className='text-red-500 text-sm'>
							{errors.phoneNumber}
						</p>
					</div>

					<button
						type='submit'
						className='bg-blue-500 w-fit px-10 mx-auto text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default OrderForm;
