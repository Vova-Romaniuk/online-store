import React, { useState, useEffect } from "react";
import Product from "../Product";
import axios from "axios";
import { ClipLoader } from "react-spinners";
function Products() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/api/cards"
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	return (
		<div className='w-10/12 mt-5 mx-auto gap-10 grid grid-cols-3'>
			{loading ? (
				<div className='w-full h-full flex items-center justify-start'>
					<ClipLoader />
				</div>
			) : (
				data?.map((product) => (
					<Product product={product} key={product.id} />
				))
			)}
		</div>
	);
}

export default Products;
