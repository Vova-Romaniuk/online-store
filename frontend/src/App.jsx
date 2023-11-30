import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./pages";
const router = createBrowserRouter(routes);
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
