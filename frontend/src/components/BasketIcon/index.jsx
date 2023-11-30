import { useBasket } from "../BasketProvider";
import { useState, useEffect } from "react";
import Basket from "../Basket";
function BasketIcon() {
	const { basket } = useBasket();
	const [isOpenBasket, setIsOpenBasket] = useState(false);
	useEffect(() => {
		if (basket.items.length <= 0) {
			handleClose();
		}
	}, [basket.items]);
	const handleOpen = () => {
		setIsOpenBasket(true);
	};
	const handleClose = () => {
		setIsOpenBasket(false);
	};
	return (
		<>
			{basket.items.length > 0 && isOpenBasket && (
				<Basket handleClose={handleClose} products={basket.items} />
			)}

			{basket.items.length > 0 && (
				<div
					onClick={handleOpen}
					className='top-[500px] bg-blue-500 hover:bg-blue-700 bg cursor-pointer fixed right-5 z-40 rounded-full h-20 w-20 shadow-md flex'>
					<i className='fa-solid fa-basket-shopping text-4xl text-white m-auto'></i>
					<span className='absolute -translate-x-2/4 left-1/2 bottom-0 rounded-full w-fit text-sm h-fit text-white'>
						{basket.items.length}
					</span>
				</div>
			)}
		</>
	);
}

export default BasketIcon;
