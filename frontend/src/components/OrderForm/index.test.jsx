import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import OrderForm from ".";

suite("OrderForm component tests", () => {
	test('renders "Повернутися на головну" button', () => {
		render(
			<Router>
				<OrderForm />
			</Router>
		);

		const backButton = screen.getByText("Повернутися на головну");
		assert(backButton);
	});

	test('renders input for "First Name"', () => {
		render(
			<Router>
				<OrderForm />
			</Router>
		);

		const firstNameInput = screen.getByLabelText("First Name:");
		assert(firstNameInput);
		assert.equal(firstNameInput.getAttribute("type"), "text");
	});

	test('renders input for "Email"', () => {
		render(
			<Router>
				<OrderForm />
			</Router>
		);

		const emailInput = screen.getByLabelText("Email:");
		assert(emailInput);
		assert.equal(emailInput.getAttribute("type"), "email");
	});

	test('renders input for "Phone Number"', () => {
		render(
			<Router>
				<OrderForm />
			</Router>
		);

		const phoneNumberInput = screen.getByLabelText("Phone Number:");
		assert(phoneNumberInput);
		assert.equal(phoneNumberInput.getAttribute("type"), "tel");
	});
});
