import styles from "../main/main.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
	const navigate = useNavigate();
	const checkToken = () => {
		const userToken = JSON.parse(localStorage.getItem("auth-user")) || "";
		const googleAuthToken = JSON.parse(localStorage.getItem("auth-google-user")) || "";
		if (userToken === "" && googleAuthToken === "") {
			navigate("/Login");
		} else {
			navigate("/Home");
		}
	};
	return (
		<>
			<section className={styles.container}>
				<div className={styles.contentContainer}>
					<h1 className={styles.heading}>
						Welcome To <span className={styles.healthSphere}>Health Sphere</span>
					</h1>
					<button
						className={styles.consultBtn}
						onClick={checkToken}>
						Consult Our Specialists
					</button>
				</div>
			</section>
		</>
	);
};
export default Main;
