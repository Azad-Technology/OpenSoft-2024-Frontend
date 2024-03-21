import React, { useState } from "react";
import styles from "./Profile.module.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../MyContexts/StateProvider";

const Profile = () => {

  const [{ token, premium }, dispatch] = useStateValue();

 const navigate = useNavigate();
 const [email, setEmail] = useState("example@example.com");
 const [currentPlan, setCurrentPlan] = useState("Basic");
 const [isEditProfileActive, setIsProfileActive] = useState(false);
 const [isBasic, setIsBasic] = useState(false);
 const [fullname, setFullname] = useState("Moganbo");
 const [isEditNameDisabled, setIsEditNameDisabled] = useState(true);
 const [isAddressDisabled, setIsAddressDisabled] = useState(true);
 const [address, setAddress] = useState("Bay Area, San Francisco, CA");
 const [password, setPassword] = useState("currentPassword");
 const [isEditPasswordDisabled, setIsEditPasswordDisabled] = useState(true);
 const [verificationcurrentPassword, setVerificationCurrentPassword] =
 useState("");
 const [newPassword, setNewPassword] = useState("");

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handlecChangePasswordClick = () => {
    setChangePasswordModalOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsProfileActive(true);
  };
  const handleConfirmChanges = () => {
    setIsProfileActive(false);
    setIsEditNameDisabled(true);
    setIsAddressDisabled(true);
  };
  const handlePremiumClick = () => {
    // do something
  };
  const handleNameChange = () => {
    setIsEditNameDisabled(false);
  };
  const handleAddressChange = () => {
    setIsAddressDisabled(false);
  };
  //const handlecChangePasswordClick = () => {
  // // verify if the current password is same or not
  // setIsEditPasswordDisabled(false);
  // };

 const handleUpdatePassword = () => {
 if (verificationcurrentPassword === password) {
 if(newPassword === confirmNewPassword){
 setPassword(newPassword);
 }
 }
 setChangePasswordModalOpen(false)
 setIsEditPasswordDisabled(true);
 };
 const handleNavigateBackward = () => {
 navigate("/")
 };

  const handleSignout=()=>{
    dispatch({
      type:'REMOVE_TOKEN'
    })
    navigate("/")
  }

 return (
 <div style={{ backgroundColor: "#101010", display: "block" }}>
 <i class="fa fa-angle-double-left" aria-hidden="true" id={styles.homeIcon} onClick={handleNavigateBackward}></i>
 <div className={styles.maincontainer}>
 <div className={styles.card}>
 <div className={styles.cardBody}>
 <img
 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
 alt="avatar"
 className={styles.avatar}
 />
 <p className={styles.details_f}>{fullname}</p>
 <p className={styles.details_f}>{currentPlan}</p>
 </div>
 </div>
 <div className={styles.card_desc}>
 <div className={styles.cardBody_desc}>
 <div className={styles.row} id={styles.topRow}>
 <div className={styles.col_sm_3}>
 <p className={styles.head}> Full Name</p>
 </div>
 <div className={styles.col_sm_9}>
 <input
 id="input"
 className={styles.details}
 value={fullname}
 disabled={isEditNameDisabled}
 onChange={(e) => setFullname(e.target.value)}
 />
 {isEditProfileActive ? (
 <i
 
 class="fa fa-edit editbtn"
 onClick={handleNameChange}
 ></i>
 ) : (
 <p></p>
 )}
 </div>
 </div>

            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Email</p>
              </div>
              <div className={styles.col_sm_9}>
                <input
                  id="input"
                  className={styles.details}
                  disabled
                  value={email}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Password</p>
              </div>
              <div className={styles.col_sm_9}>
                <input
                  id="input"
                  className={styles.details}
                  type="password"
                  disabled={isEditPasswordDisabled}
                  value={password}
                />

                {isEditPasswordDisabled ? (
                  <div
                    className={styles.col_sm_3}
                    id={styles.changePasswordcol}
                  >
                    <button
                      className={styles._btn}
                      onClick={handlecChangePasswordClick}
                    >
                      Change Password
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.col_sm_3}>
                      <label className={styles.head} htmlFor="password">
                        Current Password
                      </label>
                      <input
                        id={styles.Conpass}
                        type="password"
                        name="password"
                        onChange={(e) =>
                          setVerificationCurrentPassword(e.target.value)
                        }
                      ></input>
                    </div>

                    <div className={styles.col_sm_3}>
                      <label className={styles.head} htmlFor="password">
                        Current Password
                      </label>
                      <input
                        id={styles.Conpass}
                        type="password"
                        name="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      ></input>
                    </div>
                    <button
                      className={styles.Confpass}
                      onClick={handleUpdatePassword}
                    >
                      confirm changes
                    </button>
                  </>
                )}
              </div>
            </div>

            {isBasic ? (
              <div></div>
            ) : (
              <div className={styles.row}>
                <div className={styles.col_sm_3}>
                  <p className={styles.head}> Account details</p>
                </div>
                <div className={styles.col_sm_9}>
                  <p className={styles.details}>UPI hai bhai</p>
                </div>
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Plan</p>
              </div>
              <div className={styles.col_plan}>
                <input
                  id="input"
                  className={styles.details}
                  disabled
                  value={currentPlan}
                />
                <button className={styles._btn} onClick={handlePremiumClick}>
                  Convert to Premium
                </button>
              </div>
            </div>
            {isChangePasswordModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modal_content}>
                  <span
                    className={styles.close}
                    onClick={() => setChangePasswordModalOpen(false)}
                  >
                    &times;
                  </span>
                  <h2 className={styles.changepass}>Change Password</h2>
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="Current Password"
                    value={verificationcurrentPassword}
                    onChange={(e) =>
                      setVerificationCurrentPassword(e.target.value)
                    }
                  />
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <div className={styles.edit_button_modal} id="modal_button">
                    <button onClick={handleUpdatePassword}>
                      Confirm Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Address</p>
              </div>
              <div className={styles.col_sm_9}>
                <input
                  id="input"
                  className={styles.details}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isAddressDisabled}
                />
                {isEditProfileActive ? (
                  <i
                    class="fa fa-edit editbtn"
                    onClick={handleAddressChange}
                  ></i>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.edit_button}>
        {isEditProfileActive ? (
          <>
          <button onClick={handleConfirmChanges}>save changes</button>
          <button onClick={handleSignout}>Signout</button>
          </>
        ) : (
          <>
          <button onClick={handleEditProfileClick}>Edit Profile</button>
          <button onClick={handleSignout}>Signout</button>
          </>
        )}
      </div>
      <div className={styles.favorites}>
        <h1>Favorites</h1>
        <div className={styles.favorites_card}>
          <Card
            movies={{
              _id: 1,
              year: 2222,
              imdb: { rating: 8.8 },
              poster:
                "https://image.tmdb.org/t/p/w342/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
              plot: "A military officer is brought into an alien war against an extraterrestrial enemy who can reset the day and know the future. When this officer is enabled with the same power, he teams up with a Special Forces warrior to try and end the war.",
            }}
          />
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
