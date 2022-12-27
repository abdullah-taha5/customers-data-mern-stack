import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const getUsers = async () => {
    const { data } = await axios.get("http://localhost:5000/api/register");
    setUsers(data);
  };
  const getCustomers = async () => {
    const { data } = await axios.post("http://localhost:5000/api/getCustomer");
    setCustomers(data);
  };
  const getMessages = async () => {
    const { data } = await axios.post("http://localhost:5000/api/getMessages");
    setMessages(data);
  };
  const getNotifications = async () => {
    const { data } = await axios.get("http://localhost:5000/api/notifications");

    setNotifications(data);
  };

  useEffect(() => {
    getUsers();
    getCustomers();
    getMessages();
    getNotifications();
  }, [customers]);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-3">
          <Link to="/users">
            <div
              className="card text-white mb-3"
              style={{ maxWidth: "18rem", background: "#3B76EF" }}
            >
              <div className="card-body">
                <h3 className="card-title">Users</h3>
                <h3 className="card-text fw-bolder">{users.length}</h3>
                <button type="button" className="btn btn-light float-end">
                  See
                </button>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-3">
          <Link to="/">
            <div
              className="card text-white mb-3"
              style={{ maxWidth: "18rem", background: "#63C7FF" }}
            >
              <div className="card-body">
                <h3 className="card-title">Customers</h3>
                <h3 className="card-text fw-bolder">{customers.length}</h3>
                <button type="button" className="btn btn-light float-end">
                  See
                </button>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-3">
          <Link to="/chat">
            <div
              className="card text-white mb-3"
              style={{ maxWidth: "18rem", background: "#A66DD4" }}
            >
              <div className="card-body">
                <h3 className="card-title">Messages</h3>
                <h3 className="card-text fw-bolder">{messages.length}</h3>
                <button type="button" className="btn btn-light float-end">
                  See
                </button>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-3">
          <Link to="/notifications">
            <div
              className="card text-white mb-3"
              style={{ maxWidth: "18rem", background: "#6DD4B1" }}
            >
              <div className="card-body">
                <h3 className="card-title">Notifications</h3>
                <h3 className="card-text fw-bolder">{notifications.length}</h3>
                <button type="button" className="btn btn-light float-end">
                  See
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
