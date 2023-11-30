import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OrderForm from "./OrderForm";

test('renders "Повернутися на головну" button', () => {
	render(
		<Router>
			<OrderForm />
		</Router>
	);

	const backButton = screen.getByText("Повернутися на головну");
	expect(backButton).toBeInTheDocument();
});

test('renders input for "First Name"', () => {
	render(
		<Router>
			<OrderForm />
		</Router>
	);

	const firstNameInput = screen.getByLabelText("First Name:");
	expect(firstNameInput).toBeInTheDocument();
	expect(firstNameInput).toHaveAttribute("type", "text");
});

test('renders input for "Email"', () => {
	render(
		<Router>
			<OrderForm />
		</Router>
	);

	const emailInput = screen.getByLabelText("Email:");
	expect(emailInput).toBeInTheDocument();
	expect(emailInput).toHaveAttribute("type", "email");
});

test('renders input for "Phone Number"', () => {
	render(
		<Router>
			<OrderForm />
		</Router>
	);

	const phoneNumberInput = screen.getByLabelText("Phone Number:");
	expect(phoneNumberInput).toBeInTheDocument();
	expect(phoneNumberInput).toHaveAttribute("type", "tel");
});

// Додайте інші тести, які вам потрібні для перевірки форми
