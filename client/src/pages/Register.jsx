import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [adminRole, setAdminRole] = useState(false);

  const newUser = {
    name: name,
    email: email,
    password: password,
    adminRole: adminRole,
  };

  const createUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:5000/api/register",
      newUser
    );
    if (data.status === "ok") {
      const notify = () => toast.success("Success");
      notify();
      await axios.post("http://localhost:5000/api/notifications", {
        notification: `Create a new account in the name of [${name}]`,
      });
      window.location.pathname = "/login";
    } else {
      const notify = () =>
        toast.error("Enter a password of at least 8 characters");
      notify();
    }
  };
  return (
    <div id="container">
      <div>
        <ToastContainer />
      </div>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <form onSubmit={createUser}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="name"
              id="first-name"
              onChange={(e) => setName(e.target.value.trim())}
              value={name || ""}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email || ""}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password || ""}
              required
            />
          </div>
          <button type="submit" onSubmit={createUser}>
            Sign Up
          </button>
        </form>
      </div>
      <footer>
        <p>
          Already Have an Account? <a href="/login">Login Here</a>
        </p>
      </footer>
    </div>
  );
}

export default Register;
