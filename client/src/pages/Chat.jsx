import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Chat() {
  const token = localStorage.getItem("token");
  const user = jwt_decode(token);
  const [messageMe, setMessageMe] = useState(null);
  const [createdBy, setCreatedBy] = useState(user.name);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.post(
        "http://localhost:5000/api/getMessages"
      );
      setMessages(data);
    };
    getMessages();
  }, [messages]);
  const message = {
    messageMe,
    createdBy,
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/messages", message);
    await axios.post("http://localhost:5000/api/notifications", {
      notification: `[${createdBy}] sent a new message`,
    });

    setMessageMe(null);
  };
  const deleteAllMessages = async (id) => {
    const { data } = await axios.delete("http://localhost:5000/api/messages");
    console.log(data);
  };

  return (
    <div className="container my-3">
      <h4 className="bg-success text-white text-center py-2 fs rounded-3 my-5">
        Chat
      </h4>
      {user.adminRole && (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteAllMessages}
          >
            Delete All Messages
          </button>
        </div>
      )}
      <div
        className="chat flex-wrap"
        style={{ height: "350px", overflowY: "auto" }}
      >
        {messages.map((message, i) => {
          return (
            <div
              className={" message-me my-3 rounded"}
              style={{
                width: "fit-content",
                backgroundColor: `${
                  message.createdBy === user.name ? "#0d6efd" : "#EEEEEE"
                }`,
                color: `${message.createdBy === user.name ? "white" : "black"}`,
                float: `${message.createdBy === user.name ? "right" : "left"}`,
                clear: "both",
              }}
              key={i}
              title={new Date(message.date).toLocaleString()}
            >
              {message.createdBy === user.name ? (
                ""
              ) : (
                <h5 className="fw-bold px-2">{message.createdBy}</h5>
              )}
              <p className="px-3">{message.messageMe}</p>
            </div>
          );
        })}
      </div>
      <form className="w-75 mx-auto my-1" onSubmit={sendMessage}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Message"
            aria-describedby="button-addon2"
            value={messageMe || ""}
            onChange={(e) => setMessageMe(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="submit"
            id="button-addon2"
            onSubmit={sendMessage}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
