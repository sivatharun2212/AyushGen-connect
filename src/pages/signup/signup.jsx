import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import styles from "../signup/signup.module.css";
import { useNavigate } from "react-router-dom";
import healthill2 from "../../images/healthill2.svg";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/usercontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");

	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");

	const { setUserData } = useContext(UserContext);

	// const [authUser, setAuthUser] = useState(null);

	const uploadUserData = async (authuser) => {
		try {
			const documentRef = doc(db, "Users", authuser.user.email);
			const newUserData = {
				name,
				email,
			};

			await setDoc(documentRef, newUserData);
		} catch (error) {
			console.log(error.message);
		}
	};

	const signup = async (e) => {
		e.preventDefault();
		try {
			if (password === confirmPassword) {
				const authuser = await createUserWithEmailAndPassword(auth, email, password);
				// setAuthUser(authuser);
				console.log(authuser.user.refreshToken);

				setUserData(authuser);
				localStorage.setItem("auth-user", JSON.stringify(authuser.user.refreshToken));
				navigate("/Onboarding");
				uploadUserData(authuser);
				toast.success("Succesfully Created");
			} else {
				toast.warning("Passwords do not match");
			}
		} catch (error) {
			toast.error(`${error.message}`);
		}
	};

	return (
		<>
			<section className={styles.section}>
				<div className={styles.container}>
					<div className={styles.leftContainer}>
						<div className={styles.signUpForm}>
							<div className={styles.headingcontainer}>
								<h1 className={styles.heading}>Sign Up</h1>
							</div>
							<form
								onSubmit={signup}
								className={styles.form}>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Full Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>

								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<input
									type="password"
									name="password"
									id="password"
									placeholder="Create New Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<input
									type="password"
									name="confirmPassword"
									id="CnfPassword"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>

								<button
									type="submit"
									onClick={signup}>
									Sign up
								</button>
							</form>
						</div>
						<div className={styles.alreadHaveAccount}>
							<p className={styles.alreadHaveAccountText}>Already have an account?</p>
							<button
								onClick={() => {
									navigate("/Login");
								}}
								className={styles.signInBtn}>
								Sign In
							</button>
						</div>
					</div>
					<div className={styles.rightContainer}>
						<img
							src={healthill2}
							alt="healthill"
						/>
					</div>
				</div>
			</section>
		</>
	);
};
export default SignUp;
