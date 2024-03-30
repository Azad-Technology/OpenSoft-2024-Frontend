import React from "react";
import styles from "./CommentCard.module.css";

// Define functions and components here
function truncateComment(comment, maxLength) {
  if (comment.length <= maxLength) {
    return comment;
  }
  // Truncate the comment to the specified maximum length and add "..."
  const truncatedComment = comment.slice(0, maxLength) + "...";
  return truncatedComment;
}
function timeSince(date) {
  const backendDate = new Date(date);
  const seconds = Math.floor((new Date() - backendDate) / 1000 - 19800);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  if (interval > 0) {
    return `${interval} year ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  if (interval > 0) {
    return `${interval} month ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  if (interval > 0) {
    return `${interval} day ago`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval > 1) {
    return `${interval} hours ago`;
  }
  if (interval > 0) {
    return `${interval} hour ago`;
  }
  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  if (interval > 0) {
    return `${interval} minute ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

function CommentCard({username, profilePic, comment, movie, link, timestamp}) {
  // Component implementation
  const commentTime = new Date(timestamp);
  const timeAgo = timeSince(commentTime);
  const maxLength = 100; // Adjust this value as needed
  const maxName = 15;
  const truncatedComment = truncateComment(comment, maxLength);
  const truncatedName = truncateComment(username, maxName);

  console.log(truncatedComment);
  console.log(timestamp);

  return (
    <>
      <div className={username === "" ? `${styles.skeleton__cards} ${styles.commentCard}` : `${styles.commentCard}`}>
        <div className={styles.title}>
          {profilePic != "" && <img src={profilePic} alt="" className={styles.profilePic} />}
          <div>
            <div className={styles.username}>{truncatedName}</div>
            <div className={styles.cardTime}>{timestamp != "" && timeAgo}</div>
          </div>
        </div>

        <div className={styles.commentDetails}>
          <p className={styles.cardComment}>{truncatedComment}</p>
          <a href={link} className={styles.cardMovie}>
            {movie ? movie : ""}
          </a>
        </div>
      </div>
    </>
  );
}

export default CommentCard;
