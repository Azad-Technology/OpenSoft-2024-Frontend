import { useEffect, useState } from "react";
import styles from "./WatchListModal.module.css";
import instance from "../../axios"
import axios from "axios";
import { useStateValue } from "../../MyContexts/StateProvider";
const WatchListModal = ({ onClose, movieID }) => {
    const [{token, user}, dispatch] = useStateValue();
    const [watchlistName, setWatchListName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    const watchlists = user?.watchlist;
    const createWatchList = async (e) => {
        e.preventDefault();
        if(watchlistName === ''){
            setErrorMsg('Please enter a name');
            return;
        }
        if(watchlists?.find(watchlist => watchlist.name === watchlistName)){
            setErrorMsg('Watchlist already exists');
            return;
        }
        setErrorMsg('');
        try{
            let config = {
                method : 'post',
                headers: { 
                  'Authorization': `Bearer ${token}` 
                }
              };
             const response = await instance.request(`/add_watchlist/${watchlistName}`,config)
             let watchlistID = response.data.watchlist;
             try{
                let config2 = {
                    method: 'patch',
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                };
                const response2 = await instance.request(`/add_movie_to_watchlist/${watchlistID}/${movieID}` , config2)
            } catch (err){
                console.log(err);
            }
                
            } catch(err){
                console.log(err);
            }
        window.location.reload();
        onClose();
    }

    const addWatchList = async (e) => {
        e.preventDefault();
        if(selectedWatchlists.length === 0){
            setErrorMsg('Please select a watchlist');
            return;
        }
        setErrorMsg('');
        selectedWatchlists.forEach(async (watchlistID) => {
            try{
                let config = {
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const response = await instance.request(`/add_movie_to_watchlist/${watchlistID}/${movieID}`, config);
            } catch(err){
                console.log(err);
            }
        });
        setSelectedWatchlists([]);
        onClose();
    }
    const [selectedWatchlists, setSelectedWatchlists] = useState([]);
    const handleCheckboxChange = (id, checked) => {
        setSelectedWatchlists((prev) => {
            if(checked){
                return [...prev, id];
            }
            return prev.filter((watchlist) => watchlist !== id);
        });
    }
    
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
                onChange={(e) => setWatchListName(e.target.value)}
                />
                <button type="submit" className={styles.watchlist_modal_button} onClick={(e)=>createWatchList(e)}>Create</button>
                </div>
                {errorMsg && <div className={styles.watchlist_error}>{errorMsg}</div>}
            </div>
            <div className={styles.watchlist_divider}></div>
            <div className={styles.watchlist_modal_section}>
                <div className={styles.watchlist_modal_section_heading}>Add to Existing</div>
                <div className={styles.watchlist_modal_buttons}>
                    {watchlists?.map((watchlist) => (
                        <div className={styles.checkbox_wrapper} >
                        <label className={styles.checkbox} >
                          <input type="checkbox" className={styles.checkbox__input} onChange={(e) => (handleCheckboxChange(watchlist._id, e.target.checked))} />  
                          <span className={styles.checkbox__label}></span>
                          {watchlist.name}
                        </label>
                      </div>
                    ))}
                </div>
                <button type="submit" className={styles.watchlist_modal_button} onClick={(e)=>addWatchList(e)}> Add </button>
            </div>
            </div>
            <button className={styles.watchlist_close_button} onClick={onClose}>X</button>
        </div>
    </div>
    );
}
export default WatchListModal;