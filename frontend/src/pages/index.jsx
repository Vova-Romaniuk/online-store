import MainPage from "./MainPage";
import Layout from "../components/Layout";
import OrderForm from "../components/OrderForm";
import { BasketProvider } from "../components/BasketProvider";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";

export const routes = [
	{
		path: "/",
		element: <BasketProvider />,
		children: [
			{
				path: "/",
				element: <Layout />,
				children: [
					{
						path: "/",
						element: <MainPage />,
					},
				],
			},
			{
				path: "/order-form",
				element: <OrderForm />,
			},
		],
	},
	{ path: "/registration", element: <RegistrationPage /> },
	{ path: "/login", element: <LoginPage /> },
];
