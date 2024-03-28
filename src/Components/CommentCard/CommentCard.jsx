import React from "react";
import styles from "./CommentCard.module.css";

function truncateComment(comment, maxLength) {
  if (comment.length <= maxLength) {
    return comment;
  }
  // Split the comment into words
  const words = comment.split(" ");
  // Concatenate the first few words and add "..."
  const truncatedComment = words.slice(0, 5).join(" ") + "...";
  return truncatedComment;
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

function CommentCard({ username, profilePic, comment, movie, link, timestamp }) {
  const commentTime = new Date(timestamp);
  const timeAgo = timeSince(commentTime);

  return (
    <>
      <div className={username === "" ? `${styles.skeleton__cards}` : `${styles.commentCard}`}>
        <div className={styles.title}>
          {profilePic != "" && <img src={profilePic} alt="" className={styles.profilePic} />}
          <div>
            <h3 className={styles.username}>{username}</h3>
            <div className={styles.cardTime}>{timestamp != "" && timeAgo}</div>
          </div>
        </div>

        <div className={styles.commentDetails}>
          <p className={styles.cardComment}>{comment}</p>
          <a href={link} className={styles.cardMovie}>
            {movie ? movie : ""}
          </a>
        </div>
      </div>
    </>
  );
}

export default CommentCard;
