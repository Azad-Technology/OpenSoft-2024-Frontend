import React, {useState, useEffect, useRef} from "react";
import styles from "./Navbar.module.css";
import {Search} from "./Search";
import {MobileMenu} from "./MobileMenu.jsx";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";
import menuoptions from "./Menuoptions.jsx";
import GenreModal from "../GenreModal/GenreModal.jsx";

export const Navbar = ({movies}) => {
  const navigate = useNavigate();
  const [{token}, dispatch] = useStateValue();

  const [showDropdown, setShowDropdown] = useState({
    Genre: false,
    Country: false,
    Movies: false,
    "TV Shows": false,
    "Top IMDB": false,
  });

  const handleToggleDropdown = e => {
    const name = e.target.innerText;
    setShowDropdown(false, false, false, false, false, false);
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
  const [showModal, setShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const genres = [
    {
      name: "Top Series",
      link: "#",
      genreID: "topseries",
    },
  ];

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
    setShowModal(true);
  };

  if (window.innerWidth > 600) {
    return (
      <div className={styles.DesktopMenu}>
        <div className={`${styles.navbar} ${show && styles.navBlack}`}>
          <div className={styles.navbar__left}>
            <i
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
              className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
            <img
              onClick={() => navigate("/")}
              className={styles.navbar__logo}
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt="Netflix Logo"
            />
            <div className={styles.navbar__links}>
              {menuoptions.map((menuoption, index) => (
                <div className={styles.desktopLinks} key={index}>
                  <a
                    onMouseOver={handleToggleDropdown}
                    onClick={event => {
                      if (menuoption.name === "Top IMDB" || menuoption.name === "TV Shows") {
                        event.preventDefault();
                        setSelectedGenre(menuoption.name);
                        setSelectedID(menuoption.genreID);
                        setShowModal(true);
                      }
                    }}
                    className={styles.navbar__link}
                    key={index}
                    href="#">
                    {menuoption.name}
                  </a>
                  {showDropdown[menuoption.name] && menuoption.dropdown && (
                    <div
                      ref={dropdownRef}
                      className={styles.dropdown}
                      style={{width: menuoption.name === "Country" ? "50%" : "30%"}}>
                      <div className={styles.dropdown__column}>
                        {menuoption.dropdown.slice(0, 9).map((dropdown, index) => {
                          return (
                            <a
                              onClick={event => {
                                handleGenreClick(event, dropdown.genreID);
                              }}
                              className={styles.navbar__link_dropdown}
                              key={index}
                              href={dropdown.link}>
                              {dropdown.name}
                            </a>
                          );
                        })}
                      </div>
                      <div className={styles.dropdown__column}>
                        {menuoption.dropdown?.slice(9, 18).map((dropdown, index) => {
                          return (
                            <a
                              onClick={event => {
                                handleGenreClick(event, dropdown.genreID);
                              }}
                              className={styles.navbar__link_dropdown}
                              key={index}
                              href={dropdown.link}>
                              {dropdown.name}
                            </a>
                          );
                        })}
                      </div>
                      <div className={styles.dropdown__column}>
                        {menuoption.dropdown?.slice(18, 27).map((dropdown, index) => {
                          return (
                            <a
                              onClick={event => {
                                handleGenreClick(event, dropdown.genreID);
                              }}
                              className={styles.navbar__link_dropdown}
                              key={index}
                              href={dropdown.link}>
                              {dropdown.name}
                            </a>
                          );
                        })}
                      </div>
                      {menuoption.name === "Country" && ( // Inside the Country dropdown rendering
                        <div className={styles.dropdown__column}>
                          {menuoption.dropdown?.slice(27, 36).map((dropdown, index) => {
                            return (
                              <a
                                onClick={event => {
                                  handleGenreClick(event, dropdown.genreID);
                                }}
                                className={styles.navbar__link_dropdown}
                                key={index}
                                href={dropdown.link}>
                                {dropdown.name}
                              </a>
                            );
                          })}
                        </div>
                      )}
                      {menuoption.name === "Country" && ( // Inside the Country dropdown rendering
                        <div className={styles.dropdown__column}>
                          {menuoption.dropdown?.slice(36, 45).map((dropdown, index) => {
                            return (
                              <a
                                onClick={event => {
                                  handleGenreClick(event, dropdown.genreID);
                                }}
                                className={styles.navbar__link_dropdown}
                                key={index}
                                href={dropdown.link}>
                                {dropdown.name}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {showModal && (
                    <GenreModal genre={selectedGenre} id={selectedID} onClose={() => setShowModal(false)} />
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
              <i onClick={() => navigate("/profile")} className={`fa fa-2x fa-user ${styles.desktop_login}`}></i>
            ) : (
              <div onClick={() => navigate("/login")} className={styles.desktop_login}>
                Login
              </div>
            )}
          </div>
        </div>
        {showHamburgerMenu && <div className={styles.backdrop}></div>}
        {showHamburgerMenu && (
          <div ref={mobileMenuRef}>
            <MobileMenu
              setSelectedGenre={setSelectedGenre}
              setSelectedID={setSelectedID}
              setShowModal={setShowModal}
              setShowHamburgerMenu={setShowHamburgerMenu}
            />
          </div>
        )}
        {showModal && <GenreModal genre={selectedGenre} id={selectedID} onClose={() => setShowModal(false)} />}
      </div>
    );
  } else {
    return (
      <div className={styles.navbar__mobile}>
        <div className={`${styles.navbar} ${styles.navBlack}`}>
          <div className={styles.navbar__left}>
            <i
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
              className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
            <img
              onClick={() => navigate("/")}
              className={styles.navbar__logo}
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt="Netflix Logo"
            />
          </div>
          <div className={styles.navbar__right}>
            <i onClick={() => setShowSearchBar(true)} className={`fa fa-2x fa-search ${styles.searchIcon}`}></i>
            {token &&
            token !== undefined &&
            token !== "null" &&
            token !== "undefined" &&
            token !== null &&
            token !== "" ? (
              <i onClick={() => navigate("/profile")} className={`fa fa-2x fa-user ${styles.mobile_login}`}></i>
            ) : (
              <div onClick={() => navigate("/login")} className={styles.mobile_login}>
                Login
              </div>
            )}
          </div>
        </div>
        {showSearchBar && (
          <div ref={searchRef}>
            <Search movies={movies} searchBarRef={searchBarRef} />
          </div>
        )}
        {showHamburgerMenu && <div className={styles.backdrop}></div>}
        {showHamburgerMenu && (
          <div ref={mobileMenuRef}>
            <MobileMenu
              setSelectedGenre={setSelectedGenre}
              setSelectedID={setSelectedID}
              setShowModal={setShowModal}
              setShowHamburgerMenu={setShowHamburgerMenu}
            />
          </div>
        )}
        {showModal && <GenreModal genre={selectedGenre} id={selectedID} onClose={() => setShowModal(false)} />}
      </div>
    );
  }
};
