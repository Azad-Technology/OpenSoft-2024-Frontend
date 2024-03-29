import {useEffect, useState, useRef} from "react";
import styles from "./WatchListModal.module.css";
import instance from "../../axios";
import axios from "axios";
import {useStateValue} from "../../MyContexts/StateProvider";
const WatchListModal = ({onClose, movieID}) => {
  const [{token, user}, dispatch] = useStateValue();
  const [watchlistName, setWatchListName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedWatchlistsName, setSelectedWatchlistsName] = useState([]);

  let label = `Watchlists`;

  console.log(user);
  const watchlists = user?.watchlist;
  //   console.log(user);
  const createWatchList = async e => {
    e.preventDefault();
    if (watchlistName === "") {
      setErrorMsg("Please enter a name");
      return;
    }
    if (watchlists?.find(watchlist => watchlist.name === watchlistName)) {
      setErrorMsg("Watchlist already exists");
      return;
    }
    setErrorMsg("");
    try {
      let config = {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await instance.request(`/add_watchlist/${watchlistName}`, config);
      let watchlistID = response.data.watchlist;
      try {
        let config2 = {
          method: "patch",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response2 = await instance.request(`/add_movie_to_watchlist/${watchlistID}/${movieID}`, config2);
      } catch (err) {
        console.log(err);
      }
      config.method = "get";
      setWatchListName("");
      try {
        const res = await instance.request(`/watchlist/${watchlistID}`, config);
        dispatch({
          type: "ADD_MOVIE_TO_WATCHLIST",
          watchlist: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    onClose();
  };

  const addWatchList = async e => {
    e.preventDefault();
    if (selectedWatchlists.length === 0) {
      setErrorMsg("Please select a watchlist");
      return;
    }
    setErrorMsg("");
    selectedWatchlists.forEach(async watchlistID => {
      try {
        let config = {
          method: "patch",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await instance.request(`/add_movie_to_watchlist/${watchlistID}/${movieID}`, config);
      } catch (err) {
        console.log(err);
      }
    });
    setSelectedWatchlists([]);
    onClose();
  };
  const [selectedWatchlists, setSelectedWatchlists] = useState([]);
  const handleCheckboxChange = (id, checked) => {
    setSelectedWatchlists(prev => {
      if (checked) {
        return [...prev, id];
      }
      return prev.filter(watchlist => watchlist !== id);
    });
  };

  const handleCheckboxChange2 = (name, checked) => {
    setSelectedWatchlistsName(prev => {
      if (checked) {
        return [...prev, name];
      }
      return prev.filter(watchlist => watchlist !== name);
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setUpDownArrow("25B2");
    } else {
      setUpDownArrow("25BC");
    }
    dropdownRef.current.classList.toggle("open");
  };

  const displaySelected = label => {
    if (selectedWatchlistsName.length === 0) {
      return label; // Display 'Genre', 'Year', or 'Language'
    } else if (selectedWatchlistsName.length > 1) {
      return `${selectedWatchlistsName.slice(0, 1).join(", ")} + ${selectedWatchlistsName.length - 1} more`;
    } else {
      return selectedWatchlistsName.join(", ");
    }
  };

  return (
    <div className={styles.watchlist_modal_overlay}>
      <div className={styles.watchlist_modal}>
        <div className={styles.watchlist_modal_content}>
          <div className={styles.watchlist_modal_heading}>Add to Watchlist</div>

          <div className={styles.watchlist_modal_section}>
            <div className={styles.watchlist_modal_section_heading}>Create New Watchlist</div>
            <div className={styles.watchlist_create}>
              <input
                type="text"
                placeholder="Enter watchlist name"
                className={styles.watchlist_modal_input}
                value={watchlistName}
                onChange={e => setWatchListName(e.target.value)}
              />
              <button type="submit" className={styles.watchlist_modal_button} onClick={e => createWatchList(e)}>
                Create
              </button>
            </div>
            {errorMsg && <div className={styles.watchlist_error}>{errorMsg}</div>}
          </div>
          <div className={styles.watchlist_divider}></div>
          <div className={styles.watchlist_modal_section}>
            <div className={styles.watchlist_modal_section_heading}>Add to Existing</div>
            <div className={styles.dropdown_submit_btn_container}>
              <div className={styles.dropdowncontainer} ref={dropdownRef}>
                <button onClick={toggleDropdown} className={styles.dropdownbutton}>
                  {displaySelected(label)}
                  {/* Watchlists */}
                </button>
                <button type="submit" className={styles.watchlist_modal_button} onClick={e => addWatchList(e)}>
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
            <div className={styles.dropdowncontainer} ref={dropdownRef}>
              {isOpen && (
                <ul className={styles.dropdownlist}>
                  {watchlists?.map(watchlist => (
                    <li>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          className={styles.checkbox__input}
                          checked={selectedWatchlistsName.includes(watchlist.name) ? "checked" : ""}
                          onChange={e => {
                            handleCheckboxChange(watchlist._id, e.target.checked);
                            handleCheckboxChange2(watchlist.name, e.target.checked);
                          }}
                        />
                        <span class="input-check"></span>
                        {watchlist.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* <div className={styles.watchlist_modal_buttons}>
                {watchlists?.map(watchlist => (
                  <div className={styles.checkbox_wrapper}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        className={styles.checkbox__input}
                        onChange={e => handleCheckboxChange(watchlist._id, e.target.checked)}
                      />
                      <span className={styles.checkbox__label}></span>
                      {watchlist.name}
                    </label>
                  </div>
                ))}
              </div> */}
          </div>
          <button className={styles.watchlist_close_button} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};
export default WatchListModal;
