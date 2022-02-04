import { useContext } from "react";
import UserContext from "./UserContext";

const useAuth = () => {
	return useContext(UserContext);
};

export default useAuth;