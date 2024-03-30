import React, {useEffect, useState, useRef} from "react";
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

const Profile = ({setShowPopup3}) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDownloadInvoice = async () => {
    setIsLoading(true);
    try {
      const invoiceUrl = user?.invoice_url;
      window.open(invoiceUrl, "_blank");
    } catch (error) {
      console.error("Error fetching and downloading invoice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChangeRequest = async e => {
    try {
      const response = await instance.patch(
        "/update_user",
        {
          new_name: fullname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setShowPopup3(true);
      setTimeout(() => {
        setShowPopup3(false);
      }, 2000);
    }
  };

  const handleEditProfileClick = () => {
    if (user.subtype != "Basic") {
      setIsProfileActive(true);
      setIsEditNameDisabled(false);
    } else {
      navigate("/pricing?editProfile=true");
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
        "/update_password",
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
        }
      );
      alert("Password updated successfully");
    } catch (err) {
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
    window.location.reload();
  };

  useEffect(() => {
    setFullname(user?.name);
    setFavMovie(user?.fav);
  }, [user]);

  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollableDivRef = useRef(null);
  useEffect(() => {
    if (favMovie) {
      
      setShowRightBtn(
        scrollableDivRef.current.scrollWidth -
          scrollableDivRef.current.scrollLeft -
          scrollableDivRef.current.clientWidth >
          40 && scrollableDivRef.current.clientWidth < scrollableDivRef.current.scrollWidth
      );

      scrollableDivRef.current.addEventListener("scroll", () => {
        setShowLeftBtn(scrollableDivRef.current.scrollLeft > 40);
        setShowRightBtn(
          scrollableDivRef.current.scrollWidth -
            scrollableDivRef.current.scrollLeft -
            scrollableDivRef.current.clientWidth >
            40 && scrollableDivRef.current.clientWidth < scrollableDivRef.current.scrollWidth
        );
      });
    }
  }, [favMovie]);

  function handleLeftScroll() {
    scrollableDivRef.current.scrollLeft -= (80 * window.innerWidth) / 100;
  }
  function handleRightScroll() {
    scrollableDivRef.current.scrollLeft += (80 * window.innerWidth) / 100;
  }

  return (
    <div style={{display: "block"}}>
      <i
        className="fa fa-angle-double-left"
        aria-hidden="true"
        id={styles.homeIcon}
        onClick={handleNavigateBackward}
      ></i>
      <div className={styles.maincontainer}>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            {user?.profilePic ? (
              <img src={user.profilePic} alt="avatar" className={styles.avatar} />
            ) : (
              <div
                // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                // alt="avatar"
                className={styles.dp}
              >
                {user?.name && user.name.charAt(0).toUpperCase()}
              </div>
            )}
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

                {isEditProfileActive ? <i className="fa fa-edit editbtn" onClick={handleNameChange}></i> : <p></p>}
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

            {!user?.isGoogleAuth && (
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
            )}

            {user?.subtype === "Basic" ?(
              <div className={styles.row}>
                <div className={styles.col_sm_3}>
                  <p className={styles.head}> Account details</p>
                </div>
                <div className={styles.col_sm_9}>
                  <p className={styles.details}>No information available</p>
                </div>
              </div>
            ):
            <div className={styles.row}>
              <div className={styles.col_sm_3}>
                <p className={styles.head}> Account details</p>
              </div>
              <div className={styles.col_sm_9}>
                <p className={styles.details}>Credit Card</p>
              </div>
            </div>
            }

            {/* {!user?.subtype === "Basic" ? (
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
            )} */}

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
        <button onClick={handleDownloadInvoice} disabled={isLoading}>
          {isLoading ? "Downloading..." : "Download Invoice"}
        </button>
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

      <div className={styles.favorites}>
        <h1>Favorites</h1>

        <div className={styles.favorites_card} ref={scrollableDivRef}>
          <div className={styles.LeftbtnContainer}>
                {showLeftBtn && (
                  <button onClick={handleLeftScroll}>
                    <svg
                      fill="#CCAA00"
                      height="25px"
                      width="25px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512.001 512.001"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </button>
                )}
              </div>
              <div className={styles.RightbtnContainer}>
                {showRightBtn && (
                  <button onClick={handleRightScroll}>
                    <svg
                      fill="#CCAA00"
                      height="25px"
                      width="25px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512.001 512.001"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </button>
                )}
              </div>
          {favMovie && favMovie.length > 0 ? (
            <GeneralSlider movie={[...favMovie].reverse()} />
          ) : (
            <div className={styles.nothingToShow}>
              <div>
                <svg
                  width="80px"
                  height="80px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ff0000"
                  stroke-width="1.248"
                  transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.288"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M19 5L18.0864 5.91358M5 19L8.21252 15.7875M18.0864 5.91358C16.3142 4.5616 13.7913 4.69173 12.1544 6.42726L12 6.59097L11.8456 6.42726C9.86801 4.33053 6.59738 4.57698 4.91934 6.94915C3.42999 9.05459 3.78668 12.0335 5.725 13.6776L8.21252 15.7875M18.0864 5.91358L8.21252 15.7875M9.64206 17L12 19L18.275 13.6776C19.9081 12.2924 20.4185 9.95956 19.6479 8"
                      stroke="#ff2e2e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div>Movies liked by you will display here.</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.favorites}>
        <h1>Watchlists</h1>

        <AllWatchlists />
      </div>
    </div>
  );
};

export default Profile;
