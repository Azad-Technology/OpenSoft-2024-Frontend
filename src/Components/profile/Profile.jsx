import React, {useEffect, useState} from "react";
import styles from "./Profile.module.css";
import Card from "../Card/Card";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "../../MyContexts/StateProvider";
import GenreCard from "../Card/GenreCard";
import {AllWatchlists} from "../Watchlists/AllWatchlists";
import instance from "../../axios";
import {Slider} from "@vidstack/react";
import MovieList from "../movieList/MovieList";
import GeneralSlider from "../HomeSliders/GeneralSlider";

const Profile = () => {
  const [{token, user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("name");
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [isEditProfileActive, setIsProfileActive] = useState(false);
  const [isBasic, setIsBasic] = useState(false);
  const [isEditNameDisabled, setIsEditNameDisabled] = useState(true);
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);
  const [address, setAddress] = useState("Bay Area, San Francisco, CA");
  const [password, setPassword] = useState("currentPassword");
  const [isEditPasswordDisabled, setIsEditPasswordDisabled] = useState(true);
  const [verificationcurrentPassword, setVerificationCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [favMovie, setFavMovie] = useState([]);
  const handlecChangePasswordClick = () => {
    setChangePasswordModalOpen(true);
  };

  const sendChangeRequest = async e => {
    try {
      const response = await instance.patch(
        "/update_user/",
        {
          new_name: fullname,
          new_email: user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProfileClick = () => {
    if (user.subtype != "Basic") {
      setIsProfileActive(true);
      setIsEditNameDisabled(false);
    } else {
      navigate("/pricing");
    }
  };
  const handleConfirmChanges = () => {
    setIsProfileActive(false);
    setIsEditNameDisabled(true);
    setIsAddressDisabled(true);
    sendChangeRequest();
  };
  const handlePremiumClick = () => {
    navigate("/pricing");
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

  const handleUpdatePasswordRequest = async e => {
    try {
      const response = await instance.patch(
        "/update_password/",
        {
          old_password: verificationcurrentPassword,
          new_password: newPassword,
          repeat_password: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            
          },
        
        },
        
      );
      alert("Password updated successfully");
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 401) {
        alert("Wrong password. Please check your current password.");
      } else {
        alert("An error occurred. Make sure you have 8 characters, capital letters, numbers and special characters.");
      }
    }
  };

  const handleUpdatePassword = () => {
    setChangePasswordModalOpen(false);
    setIsEditPasswordDisabled(true);
    handleUpdatePasswordRequest();
  };
  const handleNavigateBackward = () => {
    navigate("/");
  };

  const handleSignout = () => {
    dispatch({
      type: "REMOVE_TOKEN",
    });
    navigate("/");
  };

  useEffect(() => {
    setFullname(user?.name);
    setFavMovie(user?.fav);
    console.log(favMovie);
  }, [user]);

  return (
    <div style={{backgroundColor: "#101010", display: "block"}}>
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
            <p className={styles.details_f}>{user?.subtype}</p>
          </div>
        </div>
        <div className={styles.card_desc}>
          <div className={styles.cardBody_desc}>
            <div className={styles.row} id={styles.topRow}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Full Name</p>
              </div>
              <div className={styles.col_sm_9}>
                {isEditNameDisabled ? (
                  <input
                    id="input"
                    className={styles.details}
                    value={fullname}
                    disabled={isEditNameDisabled}
                    onChange={e => setFullname(e.target.value)}
                  />
                ) : (
                  <input
                    id="input"
                    className={styles.edittableDetails}
                    value={fullname}
                    disabled={isEditNameDisabled}
                    onChange={e => setFullname(e.target.value)}
                  />
                )}

                {isEditProfileActive ? <i class="fa fa-edit editbtn" onClick={handleNameChange}></i> : <p></p>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Email</p>
              </div>
              <div className={styles.col_sm_9}>
                <input id="input" className={styles.details} disabled value={user?.email} />
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
                  <div className={styles.col_sm_3} id={styles.changePasswordcol}>
                    <button className={styles._btn} onClick={handlecChangePasswordClick}>
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
                        onChange={e => setVerificationCurrentPassword(e.target.value)}
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
                        onChange={e => setNewPassword(e.target.value)}
                      ></input>
                    </div>
                    <button className={styles.Confpass} onClick={handleUpdatePassword}>
                      confirm changes
                    </button>
                  </>
                )}
              </div>
            </div>

            {!user?.subtype === "Basic" ? (
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
                <input id="input" className={styles.details} disabled value={user?.subtype} />
                {user?.subtype != "Gold" && (
                  <button className={styles._btn} onClick={handlePremiumClick}>
                    Convert to Premium
                  </button>
                )}
              </div>
            </div>
            {isChangePasswordModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modal_content}>
                  <span className={styles.close} onClick={() => setChangePasswordModalOpen(false)}>
                    &times;
                  </span>
                  <h2 className={styles.changepass}>Change Password</h2>
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="Current Password"
                    value={verificationcurrentPassword}
                    onChange={e => setVerificationCurrentPassword(e.target.value)}
                  />
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <input
                    id="input"
                    type="password"
                    className={styles.currpass}
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                  <div className={styles.edit_button_modal} id="modal_button">
                    <button onClick={handleUpdatePassword}>Confirm Changes</button>
                  </div>
                </div>
              </div>
            )}

            {/* <div className={styles.row}>
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
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.edit_button}>
        {isEditProfileActive ? (
          <>
            <button onClick={handleConfirmChanges}>Save Changes</button>
            <button onClick={handleSignout}>Signout</button>
          </>
        ) : (
          <>
            <button onClick={handleEditProfileClick}>Edit Profile</button>
            <button onClick={handleSignout}>Signout</button>
          </>
        )}
      </div>
      {favMovie?.length > 0 && (
      <div className={styles.favorites}>
        <h1>Favorites</h1>
        <div className={styles.favorites_card}>
          {favMovie && <GeneralSlider movie={[...favMovie].reverse()} />}
        </div>
      </div>
    )}

      <div className={styles.favorites}>
        <AllWatchlists />
      </div>
    </div>
  );
};

export default Profile;
