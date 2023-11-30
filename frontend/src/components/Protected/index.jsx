import { useNavigate } from "react-router-dom";
function Protected({ isAuth, children }) {
	const navigate = useNavigate();
	if (!isAuth) {
		return navigate("/");
	}
	return children;
}

export default Protected;
