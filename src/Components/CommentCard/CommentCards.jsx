import React, {useState, useEffect, useCallback} from "react";
import CommentCard from "./CommentCard";
import styles from "./CommentCard.module.css";
//import axios from "../../axios.jsx";
import instance from "../../axios";
function CommentCards() {
  const [commentsData, setCommentsData] = useState([]);
  const [isError, setIsError] = useState(false);

  const getCommentsData = useCallback(async () => {
    try {
      const response = await instance.get("/recent_comments?count=5");
      setCommentsData(response.data);
    } catch (error) {
      setIsError(true);
    }
  }, []);
  useEffect(() => {
    getCommentsData();
  }, []);

  const profilePics = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0xnK9Tda9uC_GlPVkwcQO9dRVaCoBWs73V5Yf_FFN8i5gWSzrxBw2oS126sikhXYpQM&usqp=CAU",
    "https://w0.peakpx.com/wallpaper/1020/704/HD-wallpaper-iron-man-hero-marvel-movie.jpg",
    "https://pics.craiyon.com/2023-07-13/70f4c8db63f94f30b453aee048daee7b.webp",
    "https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp",
    "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png",
  ];

  const repeatedCommentsData = Array.from({length: 5}, () => commentsData).flat();

  return (
    <div className={styles.sliderwrapper}>
      <div className={styles.commentCards}>
        {commentsData &&
          repeatedCommentsData.map((comment, index) => (
            <CommentCard
              key={index}
              username={comment.name}
              profilePic={profilePics[index % 5]} //"https://source.unsplash.com/random"
              comment={comment.text}
              movie={comment.movie_name} //"Movie"//{fetchMovieName(comment.movie_id)}
              link={`/movie/${comment.movie_id}`}
              timestamp={comment.date}
            />
          ))}
        {commentsData.length == 0 &&
          Array(10)
            .fill(null)
            .map((_, index) => (
              <CommentCard key={index} username="" profilePic="" comment="" movie="" link="" timestamp="" />
            ))}
      </div>
    </div>
  );
}

export default CommentCards;
