import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [adminRole, setAdminRole] = useState(null);

  const user = {
    email: email,
    password: password,
    adminRole: adminRole,
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/login", user);
    if (data.status === "ok") {
      localStorage.setItem("token", data.token);
      await axios.post("http://localhost:5000/api/notifications", {
        notification: `[${email}] is logged in`,
      });
      window.location.pathname = "/";
    } else {
      alert("please check your email and password");
    }
  };
  return (
    <div id="container">
      <div className="form-wrap">
        <h1>Sign In</h1>
        <form onSubmit={loginUser}>
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
          <button type="submit" onSubmit={loginUser}>
            Sign In
          </button>
        </form>
      </div>
      <footer>
        <p>
          Do you not have an account? <a href="/register">Signup</a>
        </p>
      </footer>
    </div>
  );
}

export default Login;
