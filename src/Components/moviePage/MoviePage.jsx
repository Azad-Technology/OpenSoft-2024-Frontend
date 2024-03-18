import { useEffect } from "react";
import styles from "./moviePage.module.css"
import { useState } from "react";
import Comments from "./Comments";
import instance from "../../axios";
import { useParams } from "react-router-dom";

const MoviePage = () => {

    const { id } = useParams();
    const [movie,setMovie]=useState(null);

    useEffect(() => {
        console.log(id);
        const getData = async () => {
            const response = await instance.get(`/movies/${id}`);
            console.log(response.data)
            setMovie(response.data[0]);
        }
        getData();
    }, [id]);

    useEffect(() => {
        console.log(movie);
    }, [movie]);



    // const [description, setDescription] = useState(props.info.movieDesc);
    const [isExpanded, setIsExpanded] = useState(true);
    const [showLess, setShowLess] = useState(false);
    // const [descriptionUpdated, setDescriptionUpdated] = useState(description);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    // const cast = props.info.cast;
    // const language = props.info.languages;
    // let languageString = makeString(language);
    // const genre = ["Sci-Fi", "Movies", "Dramas", "US", "Movies", ""];
    // let genreString = makeString(genre);
    // const directors = props.info.directors
    // const directorString = makeString(directors);
    // const writers = props.info.writers
    // const writersString = makeString(writers);
    // const countries = props.info.countries;
    // const countriesString = makeString(countries);
    // const rated = "PG";


    // functions

    function makeString(list) {
        if(!list) return "";
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


//     // event listeners

//     window.addEventListener("resize", screenSizeChanged);
//     window.addEventListener("load", screenSizeChanged);

    window.addEventListener("resize", ()=>{
        setSmallScreen(window.innerWidth<=550);
    })
    window.addEventListener('load', ()=>{
        setSmallScreen(window.innerWidth<=550);
    })

   
    return (
        <>
            <div className={styles.font}>
                <div className={styles.heroSmall} style={{"backgroundImage":`url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`}}>
                    <div className={styles.title}>{movie?.title}</div>
                </div>
                <div className={styles.heroContainer} style={(!smallScreen)?{"backgroundImage":`url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`}:{"backgroundImage":"none"}}>
                    <div className={styles.content}>
                        <div className={styles.title}>{movie?.title}</div>
                        <div className={styles.description} id="description">{movie?.plot}{!isExpanded && (<button className={styles.readMore} onClick={handleReadMore}>  ...Show more</button>)}{isExpanded && showLess && (<button className={styles.readMore} onClick={handleShowLess}>&nbsp;Show less</button>)}</div>
                        <div className={styles.info}>
                            <span>
                                <span className={styles.imdbContainer}><span className={styles.imdb}>IMDb</span><span className={styles.imdbRating}>{movie?.imdb.rating}</span></span>
                                {/* <span>{props.info.duration}</span> */}
                                <span>{String(movie?.released).substring(0,4)}</span>
                            </span>
                            {/* <span className={styles.stamps}>
                                {
                                    props.info.rating.map((ele)=>(
                                        <span>{ele}</span>
                                    ))
                                }
                            </span> */}
                        </div>
                        <div className={styles.genreList}>
                            {
                                movie?.genres.map((ele)=>(
                                    <span>{ele}</span>
                                ))
                            }
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
                            <div className={styles.content}>{makeString(movie?.directors)}</div>
                        </div>
                        {/* <div className={styles.cell}>
                            <div className={styles.subHeading}>Genres</div>
                            <div className={styles.content}>

                                <div className={styles.subContent}>{genreString}</div>

                            </div>
                        </div> */}
                        <div className={styles.cell}>
                            <div className={styles.subHeading}>Audio Language(s)</div>
                            <div className={styles.content}>{makeString(movie?.languages)}</div>
                        </div>
                        <div className={styles.cell}>
                            <div className={styles.subHeading}>Awards</div>
                            <div className={styles.content}>{movie?.awards.text}</div>
                        </div>
                        
                        
                        {showMoreInfo && (<div className={styles.cast}>
                            <div className={styles.subHeading}>Cast</div>
                            <div className={styles.content}>
                                {movie.cast.map((actor) => (
                                    <div className={styles.subContent}>{actor}</div>
                                ))}
                            </div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Writers</div>
                            <div className={styles.content}>{makeString(movie.writers)}</div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Countrie(s)</div>
                            <div className={styles.content}>{makeString(movie.countries)}</div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Tomatometer</div>
                            <div className={styles.content}><div>Viewer: {movie.tomatoes.viewer.rating}</div>{/*<div>Critic: {props.info.tomatometer.critic}</div>*/}</div>
                        </div>)}
                        {showMoreInfo && (<div className={styles.cell}>
                            <div className={styles.subHeading}>Production</div>
                            <div className={styles.content}>{movie?.tomatoes.production}</div>
                        </div>)}

                    </div>
                    <div className={styles.showMoreInfoBtnCont}>
                        <button id="showMoreInfo" className={styles.showMoreInfoBtn} onClick={handleShowMoreInfoBtn}><svg fill="#cf0a0a" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path> </g> </g> </g></svg></button>
                    </div>
                </div>
                {/* <Comments info={props.info.comments}/> */}
            </div>
        </>
    )
}

export default MoviePage;