import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import styles from "./home.module.css";
import consultationImg from "../../images/consultationImg.jpg";

const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<Navbar currentPage="home" />
			<section className={styles.section}>
				<div className={styles.requestContainer}>
					<div className={styles.left}>
						<h1 className={styles.heading}>Request consultation</h1>
						<p className={styles.info}>
							Welcome to our Consultation Request section, where you can schedule a consultation with our dedicated team of healthcare specialists. <br />
							<br /> We understand that your health is of utmost importance, and we're here to provide you with expert guidance and support. <br />
							<br /> Whether you have questions, need advice, or require a comprehensive assessment, our specialists are ready to assist you. <br /> <br />
							Simply fill out the form, and we'll get back to you promptly to arrange a convenient time for your consultation. <br />
							<br /> Your well-being is our priority, and we look forward to helping you on your journey to a healthier, happier you.
						</p>
						<div className={styles.btnWrapper}>
							<button
								className={styles.reqBtn}
								onClick={() => navigate("/Consult")}>
								send consultation Request
							</button>
						</div>
					</div>

					<div className={styles.imgCont}>
						<img
							src={consultationImg}
							alt="consultationImg"
						/>
					</div>
				</div>

				{/* <div className={styles.abhaContainer}>
					<h1 className={styles.heading}>get your ABHA number now</h1>
					<p className={styles.info}>
						ABHA - Ayushman Bharat Health Account number is a 14 digit number that will uniquely identify you as a participant in India's digital healthcare ecosystem. <br />
						<br /> ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers and payers across the country. <br />
						<br /> Your ABHA number is your gateway to comprehensive healthcare coverage, giving you access to a wide range of healthcare services and benefits. We prioritize
						your health and well-being, and obtaining your ABHA number is the first step towards a healthier future. <br />
						<br />
						Get started today and experience the peace of mind that comes with Ayushman Bharat.
					</p>
					<div className={styles.btnWrapper}>
						<button className={styles.abhaBtn}>create ABHA number</button>
					</div>
				</div> */}
			</section>
		</>
	);
};
export default Home;
