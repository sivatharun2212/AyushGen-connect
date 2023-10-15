import React, { useState } from "react";
import { useEffect } from "react";
export const UserContext = React.createContext();
export const UserContextProvider = ({ children }) => {
	const initialUserData = JSON.parse(localStorage.getItem("userDetails")) || null;

	const [userData, setUserData] = useState(initialUserData);
	useEffect(() => {
		localStorage.setItem("userDetails", JSON.stringify(userData));
	}, [userData]);
	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
			}}>
			{children}
		</UserContext.Provider>
	);
};
