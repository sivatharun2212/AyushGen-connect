import styles from "./consult.module.css";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Consult = () => {
	const navigate = useNavigate();
	const handleSubmit = () => {
		toast.success("request submitted");
		navigate("/Home");
	};
	return (
		<>
			<Navbar currentPage="consult" />
			<section className={styles.consultSection}>
				<div className={styles.container}>
					<form
						onSubmit={handleSubmit}
						className={styles.form}>
						<div className={styles.fieldWrapper}>
							<div className={styles.left}>
								<div className={styles.inputCont}>
									<label>Name</label>
									<input
										className={styles.input}
										type="text"
									/>
								</div>
								<div className={styles.inputCont}>
									<label>Email</label>
									<input
										className={styles.input}
										type="email"
									/>
								</div>
								<div className={styles.inputCont}>
									<label>Mobile Number</label>
									<input
										className={styles.input}
										type="phone"
									/>
								</div>
								<div className={styles.inputCont}>
									<label>Location</label>
									<select className={styles.input}>
										<option>select location</option>
										<option>Hyderabad</option>
										<option>Chennai</option>
										<option>Mumbai</option>
										<option>Bangalore</option>
									</select>
								</div>
								<div className={styles.inputCont}>
									<label>Speciality</label>
									<select className={styles.input}>
										<option>select speciality</option>
										<option>Cardiologist</option>
										<option>ENT</option>
										<option>Gynecologist</option>
										<option>Oncologist</option>
										<option>Physician</option>
										<option>Psychiatrist</option>
										<option>Dietician</option>
										<option>Dermatologist</option>
										<option>Orthopediac Surgeon</option>
										<option>Pediatrician</option>
										<option>Neurologist</option>
										<option>Dentist</option>
									</select>
								</div>
								<div className={styles.inputCont}>
									<label>Appointment Date</label>
									<input
										className={styles.input}
										type="date"
									/>
								</div>
								<div className={styles.inputCont}>
									<label>Appointment Type</label>
									<select className={styles.input}>
										<option>At Hospital</option>
										<option>Online Consultation</option>
									</select>
								</div>
							</div>
							<div className={styles.right}>
								<div className={styles.inputContRight}>
									<label>Symptoms</label>
									<textarea
										className={styles.textarea}
										rows={7}
										cols={40}
										placeholder="Describe Symptoms"
									/>
								</div>
								<div className={styles.inputContRight}>
									<label>Medical History</label>
									<textarea
										className={styles.textarea}
										rows={7}
										cols={40}
										placeholder="Describe previous consultation if any"
									/>
								</div>
							</div>
						</div>
						<div className={styles.btnCont}>
							<button
								type="submit"
								onClick={handleSubmit}
								className={styles.submitBtn}>
								Submit
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Consult;
