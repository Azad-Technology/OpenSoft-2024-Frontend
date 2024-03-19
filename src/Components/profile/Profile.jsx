import React, { useState } from "react";
import "./Profile.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
  const handlecChangePasswordClick = () => {
    // verify if the current password is same or not
    setIsEditPasswordDisabled(false);
  };

  const handleUpdatePassword = () => {
    if (verificationcurrentPassword === password) {
      setPassword(newPassword);
    }
    setIsEditPasswordDisabled(true);
  };
  const handleNavigateBackward = () => {
    navigate("/")
  };
  return (
    <div style={{ backgroundColor: "#101010", display: "block" }}>
      <i class="fa fa-angle-double-left" id="homeIcon" onClick={handleNavigateBackward}></i>
        <div className="maincontainer">
          <div className="card">
            <div className="cardBody">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="avatar"
              />
              <p className="details_f">{fullname}</p>
              <p className="details_f">{currentPlan}</p>
            </div>
          </div>
          <div className="card_desc">
            <div className="cardBody_desc">
              <div className="row" id="topRow">
                <div className="col-sm-3">
                  <p className="head"> Full Name</p>
                </div>
                <div className="col-sm-9">
                  <input
                    className="details"
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

              <div className="row">
                <div className="col-sm-3">
                  <p className="head"> Email</p>
                </div>
                <div className="col-sm-9">
                  <input className="details" disabled value={email} />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3">
                  <p className="head"> Password</p>
                </div>
                <div className="col-sm-9">
                  <input
                    className="details"
                    type="password"
                    disabled={isEditPasswordDisabled}
                    value={password}
                  />

                  {isEditPasswordDisabled ? (
                    <div className="col-sm-3" id="changePasswordcol">
                      <button
                        className="_btn"
                        onClick={handlecChangePasswordClick}
                      >
                        Change Password
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="col-sm-3">
                        <label className="head" htmlFor="password">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) =>
                            setVerificationCurrentPassword(e.target.value)
                          }
                        ></input>
                      </div>

                      <div className="col-sm-3">
                        <label className="head" htmlFor="password">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                      </div>
                      <button onClick={handleUpdatePassword}>
                        confirm changes
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isBasic ? (
                <div></div>
              ) : (
                <div className="row">
                  <div className="col-sm-3">
                    <p className="head"> Account details</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="details">UPI hai bhai</p>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-sm-3">
                  <p className="head"> Plan</p>
                </div>
                <div className="col_plan">
                  <input className="details" disabled value={currentPlan} />
                  <button className="_btn" onClick={handlePremiumClick}>
                    Convert to Premium
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3">
                  <p className="head"> Address</p>
                </div>
                <div className="col-sm-9">
                  <input
                    className="details"
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
        <div className="edit_button">
          {isEditProfileActive ? (
            <button onClick={handleConfirmChanges}>save changes</button>
          ) : (
            <button onClick={handleEditProfileClick}>Edit Profile</button>
          )}
        </div>
        <div className="favorites">
          <h1>Favorites</h1>
          <div className="favorites_card">
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
