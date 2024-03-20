import React from 'react';
import './CommentCard.css';
function CommentCard({ username, profilePic, comment, movie, link }) {
  return (
    <div className="comment-card">
      <img src={profilePic} alt={username} className="profile-pic" />
      <div className="comment-details">
        <h3 className="card-title">{username}</h3>
        <p className="card-comment">{comment}</p>
        <a href={link} className="card-movie">{movie}</a>
      </div>
    </div>
  );
}

export default CommentCard;
