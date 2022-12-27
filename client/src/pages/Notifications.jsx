import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/notifications"
      );

      setNotifications(data);
    };
    getNotifications();
  }, [notifications]);
  const removeAllNotifications = async () => {
    const { data } = await axios.delete(
      "http://localhost:5000/api/notifications"
    );
  };
  const deleteNotification = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/notifications/${id}`
    );
    const notify = () => toast.success(data.status);
    notify();
  };
  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">Notifications</th>
            <th scope="col">Date</th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-danger"
                onClick={removeAllNotifications}
              >
                Remove All
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, i) => (
            <tr key={i}>
              <td className="text-success">{notification.notification}</td>
              <td className="text-secondary">
                {new Date(notification.date).toLocaleString()}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteNotification(notification._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Notifications;
