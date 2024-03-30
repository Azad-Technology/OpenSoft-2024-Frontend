import React from 'react';
import styles from '../Notification/notification.module.css'; // Make sure to import the CSS file

const Notification = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      {message}
    </div>
  );
};

export default Notification;
