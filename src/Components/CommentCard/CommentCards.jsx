import React from 'react';
import CommentCard from './CommentCard';
import './CommentCard.css';

function CommentCards() {
  const commentsData = [
    { username: "John Doe", profilePic: "https://example.com/profile.jpg", comment: "This is a great website!", movie: "Movie Title 1", link: "/movie-page-1" },
    { username: "Jane Smith", profilePic: "https://example.com/profile2.jpg", comment: "I love the design!", movie: "Movie Title 2", link: "/movie-page-2" },
    { username: "Alice", profilePic: "https://example.com/profile3.jpg", comment: "Nice work!", movie: "Movie Title 3", link: "/movie-page-3" }
    // Add more comment objects as needed
  ];

  return (
    <div className="comment-cards">
      {commentsData.map((comment) => (
        <CommentCard
          key={comment.link} // Remember to provide a unique key for each CommentCard
          username={comment.username}
          profilePic={comment.profilePic}
          comment={comment.comment}
          movie={comment.movie}
          link={comment.link}
        />
      ))}
    </div>
  );
}

export default CommentCards;
