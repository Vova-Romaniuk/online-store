import Product from "../Product";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function Basket({ products, handleClose }) {
	const navigate = useNavigate();

	const calculateTotal = () => {
		return products.reduce((total, product) => {
			return total + product.price * product.quantity;
		}, 0);
	};
	const handleClick = () => {
		navigate("/order-form");
		handleClose();
	};
	return (
		<div className='z-50 w-full bg-black/20 h-screen fixed flex top-0 right-0'>
			<div className='bg-white relative ml-auto mr-0 flex flex-col'>
				<i
					onClick={handleClose}
					className='fa-solid fa-xmark absolute top-5 right-5 text-black hover:scale-110 cursor-pointer'></i>
				<div className='w-10/12 mt-5 mx-auto gap-10 pt-10 grid grid-cols-2 h-5/6 overflow-y-auto'>
					{products.map((product) => (
						<Product
							product={product}
							key={product.id}
							forBasket={true}
						/>
					))}
				</div>
				<div className='mx-auto mt-5'>
					<Button onClick={handleClick} className='mr-5'>
						Замовити
					</Button>
					<span>Загальна сума: {calculateTotal().toFixed(2)}$</span>
				</div>
			</div>
		</div>
	);
}

export default Basket;
