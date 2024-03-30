import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { MobileMenu } from "./MobileMenu.jsx";
import { useStateValue } from "../../MyContexts/StateProvider.jsx";
import menuoptions from "./Menuoptions.jsx";
import GenreModal from "../GenreModal/GenreModal.jsx";
import popKornLogo from "../../assets/PopKorn_logoText.svg";
import instance from "../../axios";

export const Navbar = ({ movies, setShowLikePopup }) => {
  const [{ dpToken, user }, dpDispatch] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dpToken}`,
          },
        });

        // Assuming response.data contains the user data
        const userData = response.data;

        // Dispatch an action to update the user state with fetched data
        dpDispatch({ type: "UPDATE_USER", payload: userData });

        // Optional: Do something after fetching user data
      } catch (error) {
        // Handle errors (e.g., unauthorized access)
        console.error("Error fetching user data:", error);
        // Optionally, you can navigate to a login page or display an error message
        // navigate('/login');
      }
    };

    // Check if dpToken exists before making the request
    if (dpToken) {
      fetchUserData();
    }
  }, [dpToken]);
  const [{ token }, dispatch] = useStateValue();

  const [showDropdown, setShowDropdown] = useState({
    Genre: false,
    Country: false,
    Movies: false,
    "TV Shows": false,
    "Top IMDB": false,
  });

  const handleToggleDropdown = e => {
    const name = e.target.innerText;
    setShowDropdown({
      Genre: false,
      Country: false,
      Movies: false,
      "TV Shows": false,
      "Top IMDB": false,
    });
    setShowDropdown(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const [show, setShow] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowHamburgerMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside2(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 75 ? setShow(true) : setShow(false);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside3(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(prevState => ({
          ...prevState,
          Genre: false,
          Country: false,
        }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside3);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside3);
    };
  }, []);

  useEffect(() => {
    if (showSearchBar) {
      searchBarRef.current.focus();
    }
  }, [showSearchBar]);

  const handleGenreClick = (e, genreID) => {
    e.preventDefault();
    setSelectedGenre(e.target.innerText);
    setSelectedID(genreID);
  };

  return (
    <>
      <div className={styles.Desktop__navbar}>
        <div className={styles.DesktopMenu}>
          <div className={`${styles.navbar} ${show && styles.navBlack}`}>
            <div className={styles.navbar__left}>
              <i
                onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                className={`fa fa-2x fa-bars ${styles.hamburger}`}
              ></i>
              <img onClick={() => navigate("/")} className={styles.navbar__logo} src={popKornLogo} alt="popKorn Logo" />
              <div className={styles.navbar__links}>
                {menuoptions.map((menuoption, index) => (
                  <div className={styles.desktopLinks} key={index}>
                    <a
                      onMouseOver={handleToggleDropdown}
                      onClick={event => {
                        if (menuoption.name === "Pricing") navigate("/pricing");
                        else if (menuoption.name === "Top IMDB" || menuoption.name === "TV Shows") {
                          setSelectedGenre(menuoption.name);
                        }
                      }}
                      className={styles.navbar__link}
                    >
                      {menuoption.name}
                    </a>
                    {showDropdown[menuoption.name] && menuoption.dropdown && (
                      <div
                        ref={dropdownRef}
                        className={styles.dropdown}
                        style={{
                          width: menuoption.name === "Country" ? "45%" : "30%",
                        }}
                      >
                        <div className={styles.dropdown__column}>
                          {menuoption.dropdown.slice(0, 9).map((dropdown, index) => {
                            return (
                              <div
                                onClick={event => handleGenreClick(event, dropdown.genreID)}
                                className={styles.navbar__link_dropdown}
                                key={index}
                              >
                                {dropdown.name}
                              </div>
                            );
                          })}
                        </div>
                        <div className={styles.dropdown__column}>
                          {menuoption.dropdown?.slice(9, 18).map((dropdown, index) => {
                            return (
                              <div
                                onClick={event => handleGenreClick(event, dropdown.genreID)}
                                className={styles.navbar__link_dropdown}
                                key={index}
                              >
                                {dropdown.name}
                              </div>
                            );
                          })}
                        </div>
                        <div className={styles.dropdown__column}>
                          {menuoption.dropdown?.slice(18, 27).map((dropdown, index) => {
                            return (
                              <div
                                onClick={event => handleGenreClick(event, dropdown.genreID)}
                                className={styles.navbar__link_dropdown}
                                key={index}
                              >
                                {dropdown.name}
                              </div>
                            );
                          })}
                        </div>
                        {menuoption.name === "Country" && (
                          <div className={styles.dropdown__column}>
                            {menuoption.dropdown?.slice(27, 36).map((dropdown, index) => {
                              return (
                                <div
                                  onClick={event => handleGenreClick(event, dropdown.genreID)}
                                  className={styles.navbar__link_dropdown}
                                  key={index}
                                >
                                  {dropdown.name}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {menuoption.name === "Country" && (
                          <div className={styles.dropdown__column}>
                            {menuoption.dropdown?.slice(36, 45).map((dropdown, index) => {
                              return (
                                <div
                                  onClick={event => handleGenreClick(event, dropdown.genreID)}
                                  className={styles.navbar__link_dropdown}
                                  key={index}
                                >
                                  {dropdown.name}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.navbar__right}>
              <Search movies={movies} />
              {token &&
                token !== undefined &&
                token !== "null" &&
                token !== "undefined" &&
                token !== null &&
                token !== "" ? (
                <div onClick={() => navigate("/profile")} className={styles.avatar}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="avatar" className={styles.avatar} />
                  ) : (
                    <div
                      className={styles.dp}
                    >
                      <div className={styles.dpName}>
                        {user?.name && user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div onClick={() => navigate("/login")} className={styles.desktop_login}>
                  Login
                </div>
              )}
            </div>
          </div>
          {/* {showHamburgerMenu && <div className={styles.backdrop}></div>} */}
          {/* {showHamburgerMenu && (
            <div ref={mobileMenuRef}>
              <MobileMenu
                setSelectedGenre={setSelectedGenre}
                setSelectedID={setSelectedID}
                setShowHamburgerMenu={setShowHamburgerMenu}
              />
            </div>
          )} */}
          {selectedGenre && <GenreModal setShowLikePopup={setShowLikePopup} genre={selectedGenre} id={selectedID} onClose={() => setSelectedGenre(null)} />}
        </div>
      </div>

      <div className={styles.mobile__navbar}>
        <div className={styles.navbar__mobile}>
          <div className={`${styles.navbar} ${styles.navBlack}`}>
            <div className={styles.navbar__left}>
              <i
                onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                className={`fa fa-2x fa-bars ${styles.hamburger}`}
              ></i>
              <img onClick={() => navigate("/")} className={styles.navbar__logo} src={popKornLogo} alt="PopKorn Logo" />
            </div>
            <div className={styles.navbar__right}>
              <i onClick={() => setShowSearchBar(true)} className={`fa fa-2x fa-search ${styles.searchIcon}`}></i>
              {token &&
                token !== undefined &&
                token !== "null" &&
                token !== "undefined" &&
                token !== null &&
                token !== "" ? (
                <div onClick={() => navigate("/profile")} className={styles.avatar}>
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
                </div>
              ) : (
                <div onClick={() => navigate("/login")} className={styles.mobile_login}>
                  Login
                </div>
              )}
            </div>
          </div>
          {showSearchBar && (
            <div ref={searchRef}>
              <Search movies={movies} setShowSearchBar={setShowSearchBar} searchBarRef={searchBarRef} />
            </div>
          )}
          {selectedGenre && selectedID && (
            <GenreModal setShowLikePopup={setShowLikePopup} genre={selectedGenre} id={selectedID} onClose={() => setSelectedGenre(null)} />
          )}
        </div>
      </div>
      {showHamburgerMenu && <div className={styles.backdrop}></div>}
      {showHamburgerMenu && (
        <div ref={mobileMenuRef}>
          <MobileMenu
            setSelectedGenre={setSelectedGenre}
            setSelectedID={setSelectedID}
            setShowHamburgerMenu={setShowHamburgerMenu}
          />
        </div>
      )}
    </>
  );
};
