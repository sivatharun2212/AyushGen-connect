import { db, storage } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/usercontext";
import styles from "./profile.module.css";
import defaulticon from "../../images/user.png";
import editIcon from "../../images/edit.png";
import Loading from "../../components/loading/loading";

const Profile = () => {
	const nameInputRef = useRef(null);
	const phoneInputRef = useRef(null);
	const ageInputRef = useRef(null);
	const cityInputRef = useRef(null);
	const stateInputRef = useRef(null);
	const { userData } = useContext(UserContext);
	const userEmail = userData?.user?.email;
	const [userDetails, setUserDetails] = useState(null);
	const [editName, setEditName] = useState(false);
	const [newName, setNewName] = useState("");
	const [editPhone, setEditPhone] = useState(false);
	const [newPhone, setNewPhone] = useState("");
	const [editState, setEditState] = useState(false);
	const [newState, setNewState] = useState("");
	const [editCity, setEditCity] = useState(false);
	const [newCity, setNewCity] = useState("");
	const [editAge, setEditAge] = useState(false);
	const [newAge, setNewAge] = useState("");
	const [isEditable, setIsEditable] = useState(false);
	const [ProfileImage, setProfileImage] = useState(null);
	const [UploadProfileImage, setUploadProfileImage] = useState(null);
	const [imgUrl, setimgUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleEditName = () => {
		setEditName(!editName);
		if (!editName && nameInputRef.current) {
			nameInputRef.current.focus();
		}
	};
	const handleEditPhone = () => {
		setEditPhone(!editPhone);
		if (!editPhone && phoneInputRef.current) {
			phoneInputRef.current.focus();
		}
	};
	const handleEditAge = () => {
		setEditAge(!editAge);
		if (!editAge && ageInputRef.current) {
			ageInputRef.current.focus();
		}
	};
	const handleEditCity = () => {
		setEditCity(!editCity);
		if (!editCity && cityInputRef.current) {
			cityInputRef.current.focus();
		}
	};
	const handleEditState = () => {
		setEditState(!editState);
		if (!editState && stateInputRef.current) {
			stateInputRef.current.focus();
		}
	};
	useEffect(() => {
		try {
			const getUserData = async () => {
				setIsLoading(true);
				const userRef = doc(db, "Users", userEmail);
				const docSnap = await getDoc(userRef);
				if (docSnap.exists) {
					setUserDetails(docSnap.data());
				}
				console.log("user details", userDetails);
				setIsLoading(false);
			};
			getUserData();
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	useEffect(() => {
		const uploadImageToStorage = async () => {
			try {
				if (UploadProfileImage) {
					const imageReference = ref(storage, `ProfileImages/${UploadProfileImage?.name}`);
					await uploadBytes(imageReference, UploadProfileImage);
					const imageUrl = await getDownloadURL(imageReference);
					setimgUrl(imageUrl);
					console.log("img uploaded");
				}
			} catch (error) {
				console.error(error.message);
			}
		};
		uploadImageToStorage();
	}, [UploadProfileImage]);

	const handleImageUpload = (event) => {
		const uploadedImage = event.target.files[0];
		setProfileImage(URL.createObjectURL(uploadedImage));
		setUploadProfileImage(uploadedImage);
	};

	const updatedUserDetails = {
		image: imgUrl === "" ? userDetails?.image : imgUrl,
		name: newName === "" ? userDetails?.name : newName,
		phone: newPhone === "" ? userDetails?.phone : newPhone,
		age: newAge === "" ? userDetails?.age : newAge,
		state: newState === "" ? userDetails?.state : newState,
		city: newCity === "" ? userDetails?.city : newCity,
	};
	const updateUserDetails = async (updatedUserDetails) => {
		try {
			const documentRef = doc(db, "Users", userEmail);
			await updateDoc(documentRef, updatedUserDetails, {
				merge: true,
			});
			console.log("saved!");
			window.location.reload();
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<section className={styles.section}>
						<div className={styles.container}>
							<div className={styles.profileImgContainer}>
								<div className={styles.editbtnContainer}>
									<div className={styles.editProfileBtnCont}>
										<button
											onClick={() => {
												setIsEditable(!isEditable);
												setEditName(false);
												setEditAge(false);
												setEditCity(false);
												setEditPhone(false);
												setEditState(false);
											}}>
											Edit Profile
										</button>
									</div>
									<div className={styles.emailCont}>
										<input
											className={styles.Emailinput}
											style={{
												border: "none",
												outline: "none",
											}}
											value={userDetails?.email}
											name="Email"
											readOnly
											type="Email"
										/>
									</div>
								</div>
								<div className={styles.profileWrapper}>
									{isEditable ? (
										<>
											<label
												htmlFor="upload"
												className={styles.uploadPhoto}>
												{ProfileImage ? (
													<img
														src={ProfileImage}
														alt="img"
													/>
												) : (
													<>
														<img
															src={userDetails?.image ? userDetails.image : defaulticon}
															alt="img"
														/>
													</>
												)}
											</label>
											<input
												type="file"
												id="upload"
												accept="image/*"
												onChange={handleImageUpload}
												style={{
													display: "none",
												}}
												required
											/>
											<div className={styles.uploadPhotoText}>click on profile picture to upload new picture!</div>
										</>
									) : (
										<>
											<div className={styles.uploadPhoto}>
												<img
													src={userDetails?.image}
													alt="profile"
												/>
											</div>
										</>
									)}
								</div>
							</div>
							<div className={styles.detailsContainer}>
								<div className={styles.inputsWrapper}>
									<div className={styles.inputContainer}>
										<div className={styles.fieldWrapper}>
											<label className={styles.label}>Name</label>
											<input
												className={styles.input}
												style={{
													border: editName ? "1px solid yellow" : " 1px solid rgb(69, 153, 156)",
													outline: "none",
												}}
												value={!editName ? userDetails?.name : newName}
												name="Name"
												type="text"
												readOnly={!editName}
												onChange={(e) => setNewName(e.target.value)}
												ref={nameInputRef}
											/>
										</div>
										{isEditable && (
											<img
												src={editIcon}
												onClick={handleEditName}
												className={styles.editFieldIcon}
											/>
										)}
									</div>
									<div className={styles.inputContainer}>
										<div className={styles.fieldWrapper}>
											<label className={styles.label}>Phone</label>
											<input
												className={styles.input}
												style={{
													border: editPhone ? "1px solid yellow" : " 1px solid rgb(69, 153, 156)",
													outline: "none",
												}}
												value={!editPhone ? userDetails?.phone : newPhone}
												name="Phone"
												readOnly={!editPhone}
												onChange={(e) => setNewPhone(e.target.value)}
												type="phone"
												ref={phoneInputRef}
											/>
										</div>
										{isEditable && (
											<img
												src={editIcon}
												onClick={handleEditPhone}
												className={styles.editFieldIcon}
											/>
										)}
									</div>
									<div className={styles.inputContainer}>
										<div className={styles.fieldWrapper}>
											<label className={styles.label}>Age</label>
											<input
												className={styles.input}
												style={{
													border: editAge ? "1px solid yellow" : " 1px solid rgb(69, 153, 156)",
													outline: "none",
												}}
												value={!editAge ? userDetails?.age : newAge}
												readOnly={!editAge}
												onChange={(e) => setNewAge(e.target.value)}
												name="Age"
												type="number"
												ref={ageInputRef}
											/>
										</div>
										{isEditable && (
											<img
												src={editIcon}
												onClick={handleEditAge}
												className={styles.editFieldIcon}
											/>
										)}
									</div>

									<div className={styles.inputContainer}>
										<div className={styles.fieldWrapper}>
											<label className={styles.label}>City</label>
											<input
												className={styles.input}
												style={{
													border: editCity ? "1px solid yellow" : " 1px solid rgb(69, 153, 156)",
													outline: "none",
												}}
												value={!editCity ? userDetails?.city : newCity}
												readOnly={!editCity}
												onChange={(e) => setNewCity(e.target.value)}
												name="City"
												type="text"
												ref={cityInputRef}
											/>
										</div>
										{isEditable && (
											<img
												src={editIcon}
												onClick={handleEditCity}
												className={styles.editFieldIcon}
											/>
										)}
									</div>

									<div className={styles.inputContainer}>
										<div className={styles.fieldWrapper}>
											<label className={styles.label}>State</label>
											<input
												className={styles.input}
												style={{
													border: editState ? "1px solid yellow" : " 1px solid rgb(69, 153, 156)",
													outline: "none",
												}}
												value={!editState ? userDetails?.state : newState}
												readOnly={!editState}
												onChange={(e) => setNewState(e.target.value)}
												name="State"
												type="text"
												ref={stateInputRef}
											/>
										</div>
										{isEditable && (
											<img
												src={editIcon}
												onClick={handleEditState}
												className={styles.editFieldIcon}
											/>
										)}
									</div>
								</div>
								<div className={styles.saveContainer}>
									{isEditable && (
										<button
											className={styles.saveBtn}
											onClick={() => updateUserDetails(updatedUserDetails)}>
											save
										</button>
									)}
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

export default Profile;
