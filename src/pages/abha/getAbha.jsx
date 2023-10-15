import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./getAbha.module.css";
import Stage1 from "../../components/stage1/stage1";
import Stage2 from "../../components/stage2/stage2";
const GetAbha = () => {
	const [stage, setStage] = useState("stage1");

	const [aadhaarNumber, setAadhaarNumber] = useState("");

	return (
		<>
			<Navbar currentPage="abha" />
			<section className={styles.section}>
				{stage === "stage1" && (
					<Stage1
						aadhaarNumber={aadhaarNumber}
						setAadhaarNumber={setAadhaarNumber}
						setStage={setStage}
					/>
				)}
				{stage === "stage2" && <Stage2 />}
			</section>
		</>
	);
};

export default GetAbha;
