// import React from 'react'
import './Notification.css';

import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import Axios from "../../../../Utils/Axios";

function Notification({ isAuthenticated }) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      const fetchNotifications = () => {
        Axios.get('/vendeur/notifications')
          .then(response => {
            if (response.data.success) {
              setNotifications(response.data.data.notifications);
            }
          })
          .catch(error => {
            console.error('Error fetching notifications:', error);
          });
      };

      fetchNotifications();
    }
  }, [isAuthenticated]);

  const readNotification = (id) => {
    Axios.post(`/vendeur/notifications/${id}/mark-as-read`)
      .then(response => {
        if (response.data.success) {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
          );
        }
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
  };


  return (
    <>
      <div className='notification'>
        <IoMdNotificationsOutline className='notification_icon' />
        {notifications && notifications.length > 0 && (
          <div className="nav_notification_count">
            {notifications.length}
          </div>
        )}
        <div className="nav_notification-content">
          {notifications && notifications.length > 0 ? (
            notifications.map(notification => (
              <div key={notification.id}>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  readNotification(notification.id);

                }}>
                  {notification.data.message}
                </a><hr />
              </div>
            ))
          ) : (
            <p>Aucune notifications</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Notification
