import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import styles from './CommentCard.module.css';
//import axios from "../../axios.jsx";
import instance from "../../axios";
function CommentCards() {
  const [commentsData, setCommentsData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCommentsData = async () => {
      try {
        const response = await instance.get("/recent_comments/?count=5");
        console.log(response.data);
        setCommentsData(response.data);
      } catch (error) {
          setIsError(true);
      }
    };
    getCommentsData();
  }, []);

  const fetchMovieName = async (movieId) => {
    try {
      const response = await instance.get(`/movies/${movieId}`);
      console.log(response.data);
      // console.log("adityaxx");
      // console.log(response.data);
      
      return response.data[0].title; 
    } catch (error) {
      console.error("Error fetching movie name:", error);
      console.log("aditya");
      return "Movie"; 
      
     }
  };
  // useEffect(() => {
  //   const fetchProfilePics = async () => {
  //     try {
  //       const responses = await Promise.all(
  //         Array.from({ length: 5 }, async () => {
  //           const response = await axios.get('https://source.unsplash.com/random');
  //           return response.data; // Assuming the response.data is the image URL
  //         })
  //       );
  //       setProfilePics(responses);
  //     } catch (error) {
  //       console.error('Error fetching profile pictures:', error);
  //     }
  //   };
  //   fetchProfilePics();
  // }, []); 
  const profilePics=["https://source.unsplash.com/random","https://pics.craiyon.com/2023-07-13/70f4c8db63f94f30b453aee048daee7b.webp","https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp","https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png","https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"];

  const repeatedCommentsData = Array.from({ length: 10 }, () => commentsData).flat();
  return (
    <div className={styles.sliderwrapper}>
    <div className={styles.commentCards}>
      {repeatedCommentsData.map((comment, index) => (
        <CommentCard
          key={index}
          username={comment.name}
          profilePic={profilePics[index%5]} //"https://source.unsplash.com/random"
          comment={comment.text}
          movie="Movie"//{fetchMovieName(comment.movie_id)}
          link={`/movie/${comment.movie_id}`}
          timestamp={comment.date}
        />
      ))}
    </div>
    </div>
  );
}

export default CommentCards;
