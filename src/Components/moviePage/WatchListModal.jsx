import { useState } from "react";
import styles from "./WatchListModal.module.css";
const WatchListModal = ({ onClose, movieID, token }) => {
    const [watchlistName, setWatchListName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const createWatchList = async () => {
        console.log(watchlistName)
        if(watchlistName === ''){
            setErrorMsg('Please enter a name');
            return;
        }
        setErrorMsg('');
        try{
            const response = await instance.post(`/add_watchlist/${watchlistName}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);

        } catch(err){
            console.log(err);
        }
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
                <button className={styles.watchlist_modal_button} onClick={createWatchList}>Create</button>
                </div>
                {errorMsg && <div className={styles.watchlist_error}>{errorMsg}</div>}
            </div>
            <div className={styles.watchlist_divider}></div>
            <div className={styles.watchlist_modal_section}>
                <div className={styles.watchlist_modal_section_heading}>Add to Existing</div>
                <div className={styles.watchlist_modal_buttons}>
                <button className={styles.watchlist_modal_button} >Watchlist 1</button>
                <button className={styles.watchlist_modal_button}>Watchlist 2</button>
                <button className={styles.watchlist_modal_button}>Watchlist 3</button>
                <button className={styles.watchlist_modal_button}>Watchlist 4</button>
                <button className={styles.watchlist_modal_button}>Watchlist 4</button>
                <button className={styles.watchlist_modal_button}>Watchlist 4</button>
                <button className={styles.watchlist_modal_button}>Watchlist 4</button>
                </div>
            </div>
            </div>
            <button className={styles.watchlist_close_button} onClick={onClose}>X</button>
        </div>
    </div>
    );
}
export default WatchListModal;