import styles from "../login/login.module.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import healthill from "../../images/healthill.svg";
import googleIcon from "../../images/google-icon.svg";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/usercontext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onBoardingDone = localStorage.getItem("onBoardingDone") || "";
	const { setUserData } = useContext(UserContext);
	const uploadUserData = async (authGoogleUser) => {
		try {
			const documentRef = doc(db, "Users", authGoogleUser.user.email);
			const newUserData = {
				email: authGoogleUser.user.email,
				name: authGoogleUser.user.displayName,
				profile: authGoogleUser.user.photoURL,
			};
			await setDoc(documentRef, newUserData, { merge: true });
			console.log("data uploaded");
		} catch (error) {
			console.error(error.message);
		}
	};

	const handlelogin = async (e) => {
		e.preventDefault();
		if (email && password !== "") {
			try {
				const authuser = await signInWithEmailAndPassword(auth, email, password);
				setUserData(authuser);
				console.log("succesfully logged in ");

				localStorage.setItem("auth-user", JSON.stringify(authuser.user.refreshToken));
				navigate("/Home");
				toast.success("Login Successful");
			} catch (error) {
				if (error.code === "auth/wrong-password") {
					toast.error("Incorrect Password");
				}
				if (error.code === "auth/user-not-found") {
					toast.error("User not found");
				}
			}
		} else {
			if (email === "") {
				toast.warning("Provide email id");
			}
			if (password === "") {
				toast.warning("Provide password");
			}
		}
	};
	const handleGoogleLogin = async () => {
		try {
			const authGoogleUser = await signInWithPopup(auth, provider);
			setUserData(authGoogleUser);
			localStorage.setItem("auth-google-user", JSON.stringify(authGoogleUser.user.refreshToken));
			if (onBoardingDone === "") {
				navigate("/Onboarding");
				localStorage.setItem("onBoardingDone", "done");
			} else {
				navigate("/Home");
			}

			uploadUserData(authGoogleUser);
			console.log(authGoogleUser);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		setEmail("");
		setPassword("");
	}, []);
	return (
		<>
			<section className={styles.section}>
				<div className={styles.container}>
					<div className={styles.leftContainer}>
						<img
							src={healthill}
							alt="healthill"
						/>
					</div>
					<div className={styles.rightContainer}>
						<div className={styles.loginForm}>
							<div className={styles.headingcontainer}>
								<h1 className={styles.heading}>Sign In</h1>
							</div>
							<form
								onSubmit={handlelogin}
								className={styles.form}>
								<input
									value={email}
									type="text"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									placeholder="Enter your email"
								/>
								<input
									value={password}
									type="password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									placeholder="Enter Password"
								/>
								<button
									type="submit"
									onClick={handlelogin}>
									Sign In
								</button>
							</form>
						</div>
						<p className={styles.orText}>or</p>
						<div className={styles.createAccount}>
							<div className={styles.signin}>
								<img
									className={styles.signinImg}
									src={googleIcon}
									alt="googleIcon"
								/>
								<button onClick={handleGoogleLogin}>Continue with Google</button>
							</div>
							<div>
								<p className={styles.createAccountText}>Create new account</p>
								<button
									className={styles.signUpBtn}
									onClick={() => {
										navigate("/SignUp");
									}}>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
