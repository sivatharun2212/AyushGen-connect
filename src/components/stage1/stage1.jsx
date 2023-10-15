import { useState } from "react";
import { validateAadhaar } from "node-verhoeff";
// import axios from "axios";
// import { db } from "../../firebase";
// import { getDoc, doc } from "firebase/firestore";
// import { UserContext } from "../../context/usercontext";
import styles from "./stage1.module.css";

const Stage1 = ({ aadhaarNumber, setAadhaarNumber, setStage }) => {
	const [userConsent, setUserConsent] = useState(false);

	const handleNextClick = async () => {
		const isvalidAadhaar = validateAadhaar(aadhaarNumber);
		console.log(aadhaarNumber);
		if (isvalidAadhaar && aadhaarNumber.length === 12 && userConsent === true) {
			setStage("stage2");
			console.log(isvalidAadhaar);
			// try {
			// 	const response = await axios.post(
			// 		"https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp",
			// 		{
			// 			aadhaar: aadhaarNumber,
			// 		},
			// 		{
			// 			headers: {
			// 				Authorization: `Bearer ${accessToken}`,
			// 				"Content-Type": "application/json",
			// 			},
			// 		}
			// 	);

			// 	if (response.status === 200) {
			// 		alert("OTP request successful.");
			// 	} else {
			// 		alert("OTP request failed.");
			// 	}
			// } catch (error) {
			// 	console.error("Error requesting OTP:", error);
			// 	alert("Error requesting OTP.");
			// }
		} else {
			alert("aadhaar invalid");
		}
	};
	return (
		<>
			<section className={styles.section}>
				<div className={styles.container}>
					<p className={styles.aadhaarText}>Aadhar Number</p>
					<input
						className={styles.input}
						type="text"
						placeholder="Enter your aadhar number"
						value={aadhaarNumber}
						onChange={(e) => setAadhaarNumber(e.target.value)}
					/>
					<div>
						<h5>Consent Agreement</h5>
						<p>
							By proceeding, you agree to the{" "}
							<a
								href="https://uhi.abdm.gov.in/home/terms_condition"
								target="_blank">
								terms and conditions
							</a>{" "}
							of using the ABHA Number service.
						</p>
						<label>
							<input
								type="checkbox"
								checked={userConsent}
								onChange={() => setUserConsent(!userConsent)}
							/>
							I agree
						</label>
					</div>
					<button
						className={styles.NextBtn}
						onClick={handleNextClick}>
						Next
					</button>
				</div>
			</section>
		</>
	);
};

export default Stage1;
