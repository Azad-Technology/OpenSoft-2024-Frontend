import React from "react";
import styles from "./CommentCard.module.css";

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
  if (interval > 0) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 0) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 0) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 0) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

function CommentCard({username, profilePic, comment, movie, link, timestamp}) {
  const commentTime = new Date(timestamp);
  const timeAgo = timeSince(commentTime);
  const maxLength = 120; // Adjust this value as needed
  const truncatedComment = truncateComment(comment, maxLength);

  return (
    <>
      <div className={username === "" ? `${styles.skeleton__cards} ${styles.commentCard}` : `${styles.commentCard}`}>
        <div className={styles.title}>
          {profilePic != "" && <img src={profilePic} alt="" className={styles.profilePic} />}
          <div>
            <div className={styles.username}>{username}</div>
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
