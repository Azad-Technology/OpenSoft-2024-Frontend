import { useEffect } from "react";
import styles from "./moviePage.module.css"
import { useState } from "react";
import Comments from "./Comments";

const MoviePage = () => {

    const [description, setDescription] = useState("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis repellat soluta, amet inventore iure alias hic provident unde possimus cum culpa itaque voluptas minima! Incidunt quibusdam corrupti aliquid ipsum dolorum mollitia delectus voluptates odio voluptatum labore, ab, iusto magni. Laboriosam consequatur similique odio qui magnam minima in molestias quasi dolorem!");
    const [isExpanded, setIsExpanded] = useState(true);
    const [showLess, setShowLess] = useState(false);
    const [descriptionUpdated, setDescriptionUpdated] = useState(description);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const cast = ["Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence", "Jennifer Lawrence"];
    const language = ["Hindi", "English"];
    let languageString = makeString(language);
    const genre = ["Sci-Fi", "Movies", "Dramas", "US", "Movies", ""];
    let genreString = makeString(genre);
    const directors = ["Auguste Lumière", "Louis Lumière"]
    const directorString = makeString(directors);
    const writers = ["George MacDonald Fraser (screenplay)", "Alexandre Dumas père (novel)"]
    const writersString = makeString(writers);
    const countries = ["Spain", "USA", "Panama", "UK"];
    const countriesString = makeString(countries);
    const rated = "PG";


    // functions

    function makeString(list) {
        let string = "";
        for (let i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
                string += list[i];
            } else {
                string += list[i] + ", ";
            }
        }
        return string;
    }
    function screenSizeChanged() {
        const width = window.screen.width;
        setShowLess(false);
        if (width <= 550) {
            // const descDiv = document.getElementById("description");
            const maxLength = 200;
            if (description.length > maxLength) {
                setDescriptionUpdated(description.slice(0, maxLength));
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
                setDescriptionUpdated(description);
            }
        } else {
            setDescriptionUpdated(description);
            setIsExpanded(true);
        }
    }
    function handleReadMore() {
        setDescriptionUpdated(description);
        setIsExpanded(true);
        setShowLess(true);
    }
    function handleShowLess(){
        screenSizeChanged();
    }
    function handleShowMoreInfoBtn(){
        const elem = document.getElementById("showMoreInfo");
        if(showMoreInfo){
            setShowMoreInfo(false);
            
            elem.style.transform = 'rotate(180deg)';
        }else{
            setShowMoreInfo(true);
            elem.style.transform = 'rotate(0deg)';
        }
    }


    // event listeners

    window.addEventListener("resize", screenSizeChanged);
    window.addEventListener("load", screenSizeChanged);


    return (
        <>
            <div className={styles.font}>
                <div className={styles.heroSmall}>
                    <div className={styles.title}>Lorem, ipsum dolor.</div>
                </div>
                <div className={styles.heroContainer}>
                    <div className={styles.content}>
                        <div className={styles.title}>Lorem ipsum dolor sit.</div>
                        <div className={styles.description} id="description">{descriptionUpdated}{!isExpanded && (<button className={styles.readMore} onClick={handleReadMore}>  ...Show more</button>)}{isExpanded && showLess && (<button className={styles.readMore} onClick={handleShowLess}>&nbsp;Show less</button>)}</div>
                        <div className={styles.info}>
                            <span>
                                <span className={styles.imdbContainer}><span className={styles.imdb}>IMDb</span><span className={styles.imdbRating}>6.5</span></span>
                                <span>2 h 58 min</span>
                                <span>2023</span>
                            </span>
                            <span className={styles.stamps}>
                                <span>{rated}</span>
                                <span>HDR</span>
                                <span>UHD</span>
                                <span>U/A 13+</span>
                            </span>
                        </div>
                        <div className={styles.genreList}>
                            <span>Comedy</span>
                            <span>Drama</span>
                            <span>International</span>
                            <span>Romance</span>
                        </div>
                        <div className={styles.button}>
                            <span><button>A</button></span>
                            <span><button>B</button></span>
                            <span><button>C</button></span>
                            <span><button>D</button></span>
                        </div>
                    </div>
                </div>
                <div className={styles.movieInfo}>
                    <div className={styles.heading}>More Details</div>
                    <div className={styles.container}>
                        <div className={styles.cell}>
                            <div className={styles.subHeading}>Directors</div>
                            <div className={styles.content}>{directorString}</div>
                        </div>
                        {/* <div className={styles.cell}>
                            <div className={styles.subHeading}>Genres</div>
                            <div className={styles.content}>

                                <div className={styles.subContent}>{genreString}</div>

                            </div>
                        </div> */}
                        <div className={styles.cell}>
                            <div className={styles.subHeading}>Audio Language(s)</div>
                            <div className={styles.content}>{languageString}</div>
                        </div>
                        <div className={styles.cell}>
                            <div className={styles.subHeading}>Awards</div>
                            <div className={styles.content}>Won 1 Golden Globe. Another 3 wins & 7 nominations.</div>
                        </div>
                        
                        
                        {showMoreInfo && (<div className={styles.cast}>
                            <div className={styles.subHeading}>Cast</div>
                            <div className={styles.content}>
                                {cast.map((actor) => (
                                    <div className={styles.subContent}>{actor}</div>
                                ))}
                            </div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Writers</div>
                            <div className={styles.content}>{writersString}</div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Countrie(s)</div>
                            <div className={styles.content}>{countriesString}</div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Tomatometer</div>
                            <div className={styles.content}><div>Viewer: 78</div><div>Critic: 82</div></div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Production</div>
                            <div className={styles.content}>Live Home Video</div>
                        </div>)}

                    </div>
                    <div className={styles.showMoreInfoBtnCont}>
                        <button id="showMoreInfo" className={styles.showMoreInfoBtn} onClick={handleShowMoreInfoBtn}><svg fill="#cf0a0a" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path> </g> </g> </g></svg></button>
                    </div>
                </div>
                <Comments/>
            </div>
        </>
    )
}

export default MoviePage;