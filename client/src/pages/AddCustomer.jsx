import React, { Fragment, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AddCustomer() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputJobRef = useRef();
  const inputPhoneRef = useRef();
  const inputAddressRef = useRef();
  const token = localStorage.getItem("token");
  const user = jwt_decode(token);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [job, setJob] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const customer = {
    name: name,
    email: email,
    job: job,
    phone: phone,
    address: address,
    createdBy: user.name,
  };

  const createCustomer = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:5000/api/customer",
      customer
    );
    await axios.post("http://localhost:5000/api/notifications", {
      notification: `[${user.name}] created a new client [${name}]`,
    });
    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
    inputJobRef.current.value = "";
    inputPhoneRef.current.value = "";
    inputAddressRef.current.value = "";
    const notify = () => toast.success("Thank You!");
    notify();
  };

  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>
      <div className="container">
        <form className="form" onSubmit={createCustomer}>
          <h1 className="text-center">Add Customer</h1>
          <div className="input-group my-4">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              placeholder="Full Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              ref={inputNameRef}
              required
            />
          </div>
          <div className="input-group my-4">
            <input
              type="email"
              className="form-control"
              aria-label="Sizing example input"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
              ref={inputEmailRef}
              required
            />
          </div>
          <div className="input-group my-4">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              placeholder="Job Title"
              name="job"
              onChange={(e) => setJob(e.target.value)}
              value={job || ""}
              ref={inputJobRef}
              required
            />
          </div>
          <div className="input-group my-4">
            <input
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone || ""}
              ref={inputPhoneRef}
              required
            />
          </div>
          <div className="input-group my-4">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              placeholder="Address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address || ""}
              ref={inputAddressRef}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary "
            onSubmit={createCustomer}
          >
            Save
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default AddCustomer;
