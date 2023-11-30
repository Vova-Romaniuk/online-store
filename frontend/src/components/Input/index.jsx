function Input({ onChange, className = "", value, type = "text", ...custom }) {
	return (
		<input
			type={type}
			className={`${className}`}
			value={value}
			onChange={onChange}
			{...custom}
		/>
	);
}

export default Input;
