import defaulticon from "../../images/user.png";
import dropdown from "../../images/dropdown.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import styles from "./navbar.module.css";
import { UserContext } from "../../context/usercontext";
import { getDoc, doc } from "firebase/firestore";

const Navbar = (props) => {
	const navigate = useNavigate();
	const { userData } = useContext(UserContext);
	const userEmail = userData?.user?.email;
	const [userDetails, setUserDetails] = useState(null);
	const currentPage = props.currentPage;

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const signout = async () => {
		await signOut(auth);
		navigate("/Login");
		localStorage.removeItem("auth-user");
		localStorage.removeItem("auth-google-user");
		localStorage.removeItem("userDetails");
	};

	useEffect(() => {
		try {
			const getUserData = async () => {
				const userRef = doc(db, "Users", userEmail);
				const docSnap = await getDoc(userRef);
				if (docSnap.exists) {
					setUserDetails(docSnap.data());
				}
				console.log("user details", userDetails);
			};
			getUserData();
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.headingBox}>
					<h1 className={styles.heading}>Health Sphere</h1>
				</div>
				<div
					style={{ justifyContent: currentPage !== "home" ? "flex-end" : "" }}
					className={styles.profileBox}>
					{currentPage === "home" && (
						<div className={styles.abhaCont}>
							<button
								onClick={() => navigate("/GetAbha")}
								className={styles.abhaBtn}>
								Get ABHA Number
							</button>
						</div>
					)}

					<div className={styles.photo}>
						<div className={styles.imageWrapper}>
							<img
								onClick={() => navigate("/Profile")}
								src={userDetails?.image ? userDetails.image : defaulticon}
								alt="Your Photo "
							/>
						</div>
					</div>
					<div className={styles.dropdown}>
						<img
							src={dropdown}
							onClick={() => {
								setIsDropDownOpen(!isDropDownOpen);
							}}
							alt="dropdown"
						/>
					</div>
				</div>
				{isDropDownOpen && (
					<div className={styles.dropdownBox}>
						<button
							className={styles.profileBtn}
							onClick={() => {
								navigate("/Profile");
							}}>
							Profile
						</button>
						<button
							className={styles.signOutBtn}
							onClick={signout}>
							Sign Out
						</button>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
