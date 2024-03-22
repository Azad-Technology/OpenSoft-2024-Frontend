import React from 'react';
import CommentCard from './CommentCard';
import styles from './CommentCard.module.css';




function CommentCards() {
  const commentsData = [
    {
      username: "John Doe",
      profilePic: "https://example.com/profile.jpg",
      comment: "This is a great website!",
      movie: "Short Sharp Shock",
      link: "/movie/573a139df29313caabcfab66",
      timestamp: new Date(Date.now() - (5 * 60 * 60 * 1000)) // 5 hours ago
    },
    {
      username: "Jane Smith",
      profilePic: "https://example.com/profile2.jpg",
      comment: "I love the design!",
      movie: "The Italian",
      link: "/movie/573a1390f29313caabcd56df",
      timestamp: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)) // 2 days ago
    },
    {
      username: "Alice",
      profilePic: "https://example.com/profile3.jpg",
      comment: "Mind Blowing",
      movie: "Civilization",
      link: "/movie/573a1390f29313caabcd5a93",
      timestamp: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) // 1 month ago
    },
    {
      username: "Trump",
      profilePic: "https://example.com/profile3.jpg",
      comment: "Good Movie wow",
      movie: "The Ace of Hearts",
      link: "/movie/573a1391f29313caabcd6f98",
      timestamp: new Date(Date.now() - (365 * 24 * 60 * 60 * 1000)) // 1 year ago
    },
    {
      username: "Jaspreet",
      profilePic: "https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
      comment: "Nice work!",
      movie: "Inception",
      link: "/movie/573a13c5f29313caabd6ee61",
      timestamp: new Date(Date.now() - (2 * 365 * 24 * 60 * 60 * 1000)) // 2 years ago
    },
  ];
  const repeatedCommentsData = Array.from({ length: 10 }, () => commentsData).flat();
  return (
    <div className={styles.sliderwrapper}>
      <div className={styles.commentCards}>
        {repeatedCommentsData.map((comment, index) => (
          <CommentCard
            key={index} // Use index as key since link might not be unique
            username={comment.username}
            profilePic={comment.profilePic}
            comment={comment.comment}
            movie={comment.movie}
            link={comment.link}
            timestamp={comment.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentCards;
