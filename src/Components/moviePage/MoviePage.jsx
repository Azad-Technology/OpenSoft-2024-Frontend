import {useEffect} from "react";
import styles from "./moviePage.module.css";
import {useState} from "react";
import Comments from "./Comments";
import instance from "../../axios";
import {useParams} from "react-router-dom";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {MediaPlayer, MediaProvider} from "@vidstack/react";
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

function Modal({onClose}) {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        {/* Video container */}
        <div className={styles.video_container}>
          <div className={styles.video}>
            <MediaPlayer
              storage="storage-key"
              title="Dune"
              src="https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/dune_master.m3u8"
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
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

function ModalTrail({onClose}) {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        {/* Video container */}
        <div className={styles.video_container}>
          <div className={styles.video}>
            <MediaPlayer
              clipEndTime={30}
              storage="storage-key"
              title="Dune"
              src="https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/dune_master.m3u8"
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
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

const MoviePage = () => {
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
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

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
    const elem = document.getElementById("showMoreInfo");
    if (showMoreInfo) {
      setShowMoreInfo(false);

      elem.style.transform = "rotate(180deg)";
    } else {
      setShowMoreInfo(true);
      elem.style.transform = "rotate(0deg)";
    }
  }
  const openHeart = event => {
    if (!token) {
      navigate("/login");
    }

    if (like) {
      setlike(false);
    } else {
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
      console.log(err);
    }
  };

  useEffect(() => {
    setlike(user?.fav.some(movies => movies?._id === movie?._id));
  }, [movie, user]);

  //     // event listeners

  //     window.addEventListener("resize", screenSizeChanged);
  //     window.addEventListener("load", screenSizeChanged);

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
          setShowPopup(true);
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
      <div className={styles.font}>
        <div
          className={styles.heroSmall}
          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie?.backdrop_path})`}}
        >
          <div className={styles.title}>{movie?.title}</div>
        </div>
        <div
          className={styles.heroContainer}
          style={
            (!smallScreen && movie)
              ? {backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie?.backdrop_path})`}
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
                  {ele} <img src = {popupIcon} className={styles.popupIcon} />
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
                <span>
                  <span className={styles.icon} id="heartIcon">
                    {like ? (
                      <i class={`fa fa-heart fa-lg`} aria-hidden="true" onClick={openHeart}></i>
                    ) : (
                      <i class={`fa fa-heart-o fa-lg`} aria-hidden="true" onClick={openHeart}></i>
                    )}
                  </span>
                </span>
                <img src={watchlistoff} className={styles.watchlisticon} onClick={toggleWatchlist} />
                {showModal && <Modal onClose={() => setShowModal(false)} />}
                {showTrailModal && <ModalTrail onClose={() => setShowTrailModal(false)} />}
                {showWatchListModal && <WatchListModal movieID={id} onClose={() => setShowWatchListModal(false)} />}
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
                {movie?.fullplot}
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

        {comments ? <Comments info={comments} id={id} /> : <></>}

        <MoreLikeThis id={id} />
        {/* <div className={styles.loaderIcon}>
                    <Loader />
                </div> */}
        {selectedGenre && <GenreModal genre={selectedGenre} onClose={() => setSelectedGenre(null)} />}
      </div>
    </>
  );
};

export default MoviePage;
