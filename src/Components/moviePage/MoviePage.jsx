import {useEffect} from "react";
import styles from "./moviePage.module.css";
import {useState} from "react";
import Comments from "./Comments";
import instance from "../../axios";
import {useParams} from "react-router-dom";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {MediaPlayer, MediaProvider, PIPButton,Poster,useMediaState} from "@vidstack/react";
import {defaultLayoutIcons, DefaultVideoLayout} from "@vidstack/react/player/layouts/default";
import "./../../index.css";
import {useStateValue} from "../../MyContexts/StateProvider";
import {useNavigate} from "react-router-dom";
import watchlistoff from "./../../assets/watchlistoff.svg";
import Loader from "./../Loader/Loader.jsx";
import popupIcon from "./../../assets/popupIcon.svg";
import WatchListModal from "./WatchListModal.jsx";
import MoreLikeThis from "./MoreLikeThis/MoreLikeThis";
import GenreModal from "../GenreModal/GenreModal";
import closeIcon from "../../assets/close-47.svg";
import chooseMovie from "./MovieList.jsx";
import Notification from "../Notification/notification.jsx";

function Modal({onClose, movie, token}) {
  const [{user}, dispatch] = useStateValue();
  const [vidsrc, setVidsrc] = useState(null);
  const [vidthumb, setVidthumb] = useState(null);
  // const isActive = useMediaState('pictureInPicture');
  useEffect(() => {
    if (movie && token) {
      const choosenmovie = chooseMovie(movie?.title);
      setVidthumb(choosenmovie[3]);
      switch (user.subtype) {
        case "Basic":
          setVidsrc(choosenmovie[0]);
          break;
        case "Silver":
          setVidsrc(choosenmovie[1]);
          break;
        case "Gold":
          setVidsrc(choosenmovie[2]);
          break;
        default:
          setVidsrc(choosenmovie[0]);
      }
    }
  }, [user, movie]);

  return (
      <div className={styles.modal_overlay}>
          <div className={styles.modal}>
          {/* Video container */}
            <div className={styles.video_container}>
            {user?.subtype==="Basic"? 
            <div className="basic_video">
              <div className={styles.video}>
                <MediaPlayer
                  storage={user?.subtype!="Basic" && `${movie?._id} movie ${user?.email} user`}
                  title={movie?.title}
                  src={vidsrc+"?mid="+movie?._id+"?uid="+user?.email}
                >
                  <MediaProvider >
                    <Poster className="vds-poster" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "/backdrop.jpg"} />
                  </MediaProvider>
                  <DefaultVideoLayout thumbnails={vidthumb} icons={defaultLayoutIcons} >
                    {/* {user?.subtype==="Basic" && <PIPButton style={{display:"none"}}/>} */}
                  </DefaultVideoLayout>
                </MediaPlayer>
              </div>
            </div>:
            <div className="premium_video">
              <div className={styles.video}>
                <MediaPlayer
                  storage={user?.subtype!="Basic" && `${movie?._id} movie ${user?.email} user`}
                  title={movie?.title}
                  src={vidsrc+"?mid="+movie?._id+"?uid="+user?.email}
                >
                  <MediaProvider >
                    <Poster className="vds-poster" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "/backdrop.jpg"} />
                  </MediaProvider>
                  <DefaultVideoLayout thumbnails={vidthumb} icons={defaultLayoutIcons} >
                    {/* {user?.subtype==="Basic" && <PIPButton style={{display:"none"}}/>} */}
                  </DefaultVideoLayout>
                </MediaPlayer>
              </div>
            </div>
}
            </div>
          </div>
        {/* Close button */}
        <button className={styles.close_button} onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
  );
}

function ModalTrail({onClose, movie}) {
  const [{user}, dispatch] = useStateValue();
  const [vidsrc, setVidsrc] = useState(null);
  const [vidthumb, setVidthumb] = useState(null);
  useEffect(() => {
    if (movie) {
      const choosenmovie = chooseMovie(movie?.title);
      setVidthumb(choosenmovie[3]);
      switch (user?.subtype) {
        case "Basic":
          setVidsrc(choosenmovie[0]);
          break;
        case "Silver":
          setVidsrc(choosenmovie[1]);
          break;
        case "Gold":
          setVidsrc(choosenmovie[2]);
          break;
        default:
          setVidsrc(choosenmovie[0]);
      }
    }
  }, [user, movie]);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        {/* Video container */}
        <div className={styles.video_container}>
          <div className="basic_video">
            <div className={styles.video}>
              <MediaPlayer
              clipEndTime={30}
                storage={user?.subtype!="Basic" && `${movie?._id} trail ${user?.email} user`}
                title={movie?.title}
                src={vidsrc+"?tid="+movie?._id+"?uid="+user?.email}
              >
                <MediaProvider >
                  <Poster className="vds-poster" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "/backdrop.jpg"} />
                </MediaProvider>
                <DefaultVideoLayout thumbnails={vidthumb} icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
          </div>
        </div>
        {/* Close button */}
        <button className={styles.close_button} onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
}

const MoviePage = ({setShowLikePopup}) => {
  const [premium, setPremium] = useState(true);

  const [{token, user}, dispatch] = useStateValue();

  //Genre Modals
  const [selectedGenre, setSelectedGenre] = useState(null);
  // const [overlayHeight, setOverlayHeight] = useState('100%');

  const openModal = genre => {
    setSelectedGenre(genre);
  };
  //Genre Modals end

  const navigate = useNavigate();
  const [showWatchListModal, setShowWatchListModal] = useState(false);

  const {id} = useParams();
  // const {com} = useParams();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [smallPlot, setSmallPlot] = useState("");
  const [comments, setComments] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showTrailModal, setShowTrailModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [like, setlike] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const response = await instance.get(`/movies/${id}`);
      // console.log(response.data);
      setMovie(response.data[0]);
    };
    getData();
  }, [id]);
  useEffect(() => {
    setPremium(movie?.imdb.rating >= 8);
  }, [movie]);

  useEffect(() => {
    const getCommentData = async () => {
      const response = await instance.get(`/movies/${id}/comments/?count=10`);
      // console.log(response.data);
      setComments(response.data);
    };
    getCommentData();
  }, [id]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [showLess, setShowLess] = useState(false);
  const [showPlotLess, setShowPlotLess] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  // functions

  function makeString(list) {
    if (!list) return "";
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
  function handleShowLess() {
    screenSizeChanged();
  }
  function handleShowMoreInfoBtn() {
    console.log("clicked");
    const elem = document.getElementById("showMoreInfobtn");
    if(showMoreInfo){
      elem.style.transform = "rotate(0deg)";
    } else{
      elem.style.transform = "rotate(180deg)";
    }
    setShowMoreInfo(!showMoreInfo);
    setShowPlotLess(!showPlotLess);
  }
  const openHeart = event => {
    if (!token) {
      navigate("/login");
    }

    if (like) {
      setlike(false);
    } else {
      if (user?.subtype === "Basic" && user.fav.length >= 10) {
        event.stopPropagation();
        setShowLikePopup(true);
        setTimeout(() => {
          setShowLikePopup(false);
        }, 2000);
        return;
      }
      setlike(true);
    }
    event.stopPropagation();
    addFavouriteRequest();
  };
  const addFavouriteRequest = async e => {
    try {
      const response = await instance.patch(`/add_favourite/${movie?._id}`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!like) {
        dispatch({type: "ADD_FAV", movie: movie});
      } else {
        dispatch({type: "REM_FAV", movie: movie});
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    setlike(user?.fav.some(movies => movies?._id === movie?._id));
  }, [movie, user]);

  window.addEventListener("resize", () => {
    setSmallScreen(window.innerWidth <= 550);
  });
  window.addEventListener("load", () => {
    setSmallScreen(window.innerWidth <= 550);
  });

  const handleClick = () => {
    if (token && token != "null" && token !== undefined && token != "undefined" && token != "") {
      if (!movie) return;
      if (!premium) {
        setShowModal(true);
      } else {
        if (user && user.subtype != "Basic") {
          setShowModal(true);
        } else {
          // setShowPopup(true);
          navigate("/pricing");
          setTimeout(() => {
            setShowPopup(false);
          }, 4000);
        }
      }
    } else {
      navigate("/login");
    }
  };
  const handleTrailerClick = () => {
    setShowTrailModal(true);
  };
  const toggleWatchlist = () => {
    if (token && token != "null" && token !== undefined && token != "undefined" && token != "") {
      setShowWatchListModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {addedToWatchlist && <Notification message={`Added To Watchlist`} isVisible={addedToWatchlist}/>}
      <div className={styles.font}>
        <div
          className={styles.heroSmall}
          style={{
            backgroundImage: `url(${movie && movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "/backdrop.jpg"})`,
          }}
        >
          <div className={styles.title}>{movie?.title}</div>
        </div>
        <div
          className={styles.heroContainer}
          style={
            !smallScreen && movie
              ? {
                  backgroundImage: `url(${movie && movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "/backdrop.jpg"})`,
                }
              : {backgroundImage: "none"}
          }
        >
          <div className={styles.content}>
            {premium && <div className={styles.premium}>Included with premium</div>}

            <div className={styles.shadowBox}>
              {!movie?.title && (
                <div className={styles.skeleton__headers}>
                  <div className={styles.skeleton__header}></div>
                  <div className={styles.skeleton__header}></div>
                  <div className={styles.skeleton__header}></div>
                </div>
              )}
              <div className={styles.title}>{movie?.title}</div>
              {!movie?.plot && (
                <div className={styles.skeleton__headers}>
                  <div className={styles.skeleton__description}></div>
                  <div className={styles.skeleton__description}></div>
                  <div className={styles.skeleton__description}></div>
                  <div className={styles.skeleton__description}></div>
                  <div className={styles.skeleton__description}></div>
                </div>
              )}
              <div className={styles.description} id="description">
                {movie?.plot}
                {!isExpanded && (
                  <button className={styles.readMore} onClick={handleReadMore}>
                    {" "}
                    ...Show more
                  </button>
                )}
                {isExpanded && showLess && (
                  <button className={styles.readMore} onClick={handleShowLess}>
                    &nbsp;Show less
                  </button>
                )}
              </div>
            </div>
            <div className={styles.info}>
              <span>
                <span className={styles.imdbContainer}>
                  <span className={styles.imdb}>IMDb</span>
                  <span className={styles.imdbRating}>
                    {!movie?.imdb && (
                      <div className={styles.skeleton__headers}>
                        <div className={styles.skeleton__small}></div>
                        <div className={styles.skeleton__small}></div>
                      </div>
                    )}
                    {movie?.imdb && movie?.imdb.rating}
                  </span>
                </span>
                {/* <span>{props.info.duration}</span> */}
                {!movie?.year && (
                  <div className={styles.skeleton__headers}>
                    <div className={styles.skeleton__small}></div>
                    <div className={styles.skeleton__small}></div>
                  </div>
                )}
                <span>{movie?.year && movie?.year}</span>
                <span>
                  <span className={styles.icon} id="heartIcon">
                    {like ? (
                      <i className={`fa fa-heart fa-lg`} aria-hidden="true" onClick={openHeart} style={{color:"red"}}></i>
                    ) : (
                      <i className={`fa fa-heart-o fa-lg`} aria-hidden="true" onClick={openHeart}></i>
                    )}
                  </span>
                </span>
                <img src={watchlistoff} className={styles.watchlisticon} onClick={toggleWatchlist} />
                {showWatchListModal && <WatchListModal movieID={id} onClose={() => setShowWatchListModal(false)} setAddedToWatchlist={setAddedToWatchlist} />}
              </span>
            </div>
            <div className={styles.genreList}>
              {!movie?.genres && (
                <div className={styles.skeleton__headers}>
                  <div className={styles.skeleton__small}></div>
                  <div className={styles.skeleton__small}></div>
                </div>
              )}
              {!movie?.genres && (
                <div className={styles.skeleton__headers}>
                  <div className={styles.skeleton__small}></div>
                  <div className={styles.skeleton__small}></div>
                </div>
              )}
              {!movie?.genres && (
                <div className={styles.skeleton__headers}>
                  <div className={styles.skeleton__small}></div>
                  <div className={styles.skeleton__small}></div>
                </div>
              )}
              {movie?.genres.map(ele => (
                <button className={styles.genreButtons} onClick={() => openModal(ele)}>
                  {ele} <img src={popupIcon} className={styles.popupIcon} />
                </button>
              ))}
            </div>
            <div className={styles.Mbutton}>
              <span>
                <button className={`${!movie && styles.skeleton_button} ${styles.modalbutton}`} onClick={handleClick}>
                  Watch Now
                </button>
                <button className={styles.modalbutton} onClick={handleTrailerClick}>
                  Trailer
                </button>
                {showModal && <Modal token={token} movie={movie} onClose={() => setShowModal(false)} />}
                {showTrailModal && <ModalTrail movie={movie} onClose={() => setShowTrailModal(false)} />}
                
              </span>
            </div>
          </div>
        </div>

        <div className={styles.heading}>More Details</div>
        <div className={styles.movieInfo}>
          <div className={styles.fullplot}>
            <div className={styles.cell}>
              {movie?.fullplot && <div className={styles.subHeading}>Plot</div>}
              <div className={styles.content}>
                {!movie?.fullplot && (
                  <div className={styles.skeleton__headers}>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                  </div>
                )}
                {movie?.fullplot.length < 600 && movie?.fullplot}
                {movie?.fullplot.length >= 600 && showPlotLess && movie?.fullplot.slice(0, 600) + "..."}
                {movie?.fullplot.length >= 600 && !showPlotLess && movie?.fullplot}
              </div>
            </div>
          </div>

          <div className={styles.container}>
            {movie?.cast && (
              <div className={styles.cell}>
                {movie?.cast && <div className={styles.subHeading}>Cast</div>}
                <div className={styles.content}>{makeString(movie?.cast)}</div>
              </div>
            )}
            <div className={styles.cell}>
              {movie?.languages && <div className={styles.subHeading}>Languages</div>}
              <div className={styles.content}>
                {!movie?.fullplot && (
                  <div className={styles.skeleton__headers}>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                    <div className={styles.skeleton__plot}></div>
                  </div>
                )}
                {makeString(movie?.languages)}
              </div>
            </div>
            {movie?.directors && (
              <div className={styles.cell}>
                <div className={styles.subHeading}>Director</div>
                <div className={styles.content}>{makeString(movie?.directors)}</div>
              </div>
            )}
          </div>
        </div>
        {movie?.fullplot.length >= 600 && (
          <div className={styles.showMoreInfoBtnCont}>
            <button onClick={handleShowMoreInfoBtn} className={styles.showMoreInfoBtn} id="showMoreInfobtn">
                  <svg
                    // fill="#cf0a0a"
                    fill="#fffe3e"
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
          </div>
        )}

        {comments ? <Comments setComments={setComments} info={comments} id={id} /> : <></>}

        <MoreLikeThis setShowLikePopup={setShowLikePopup} id={id} />
        {selectedGenre && <GenreModal setShowLikePopup={setShowLikePopup} genre={selectedGenre} onClose={() => setSelectedGenre(null)} />}
      </div>
    </>
  );
};

export default MoviePage;
