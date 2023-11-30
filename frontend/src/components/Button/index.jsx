function Button({ children, onClick, className = "" }) {
	return (
		<button
			className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
