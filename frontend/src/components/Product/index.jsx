import React, { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import { useBasket } from "../BasketProvider";

const Product = ({ product, forBasket = false }) => {
	const [quantity, setQuantity] = useState(1);
	const { addToBasket } = useBasket();
	const { removeFromBasket } = useBasket();
	const { updateBasketItemQuantity } = useBasket();

	const handleQuantityChange = (e) => {
		const newQuantity = parseInt(e.target.value, 10);
		setQuantity(newQuantity);
	};

	useEffect(() => {
		updateBasketItemQuantity(product.id, quantity);
	}, [quantity]);

	const handleClick = () => {
		addToBasket({ ...product, quantity });
	};
	const handleDelete = () => {
		removeFromBasket(product.id);
	};
	return (
		<div className='max-w-md mx-auto bg-white rounded-xl h-[460px] overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2'>
			<img
				className='w-full h-48 object-cover'
				src={product.url}
				alt={product.name}
			/>
			<div className='p-6 flex flex-col justify-between'>
				<h2 className='text-xl font-semibold text-gray-800'>
					{product.name}
				</h2>
				<p className='text-gray-600 mb-4'>{product.description}</p>
				<div className='flex items-center justify-between'>
					<a
						href={product.url}
						target='_blank'
						className='text-blue-500 hover:underline'>
						Learn more
					</a>
					<p className='text-gray-700'>${product.price.toFixed(2)}</p>
				</div>
				<div className='mt-4 flex justify-between items-center'>
					{forBasket && (
						<Input
							type='number'
							className='w-20 h-10 border border-gray-300 rounded-md px-2 focus:outline-none focus:border-blue-500'
							value={quantity}
							onChange={handleQuantityChange}
							min={1}
						/>
					)}
					{forBasket ? (
						<Button
							className='ml-auto mt-auto mr-0 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded  focus:outline-none focus:shadow-outline'
							onClick={handleDelete}>
							Remove from cart
						</Button>
					) : (
						<Button
							className='ml-auto mt-auto mr-0 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded  focus:outline-none focus:shadow-outline'
							onClick={handleClick}>
							Add to Cart
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
