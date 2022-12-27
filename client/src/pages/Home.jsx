import React, { Fragment, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputJobRef = useRef();
  const inputPhoneRef = useRef();
  const inputAddressRef = useRef();
  const [customer, setCustomer] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const user = jwt_decode(token);
  const getData = async () => {
    const { data } = await axios.post("http://localhost:5000/api/getCustomer");
    setCustomer(data);
  };

  useEffect(() => {
    getData();
  }, [customer]);

  const deleteCustomer = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/customer/${id}`
    );
    const notify = () => toast.success(data.status);
    notify();
  };

  const saveChanges = async (id) => {
    await axios.patch(`http://localhost:5000/api/customer/${id}`, {
      name: inputNameRef.current.value,
      email: inputEmailRef.current.value,
      job: inputJobRef.current.value,
      phone: inputPhoneRef.current.value,
      address: inputAddressRef.current.value,
    });
    inputNameRef.current.value = null;
    inputEmailRef.current.value = null;
    inputJobRef.current.value = null;
    inputPhoneRef.current.value = null;
    inputAddressRef.current.value = null;
  };

  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>
      <h3 className="text-center m-5">Customers Data</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Job Title</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Created By</th>
            <th scope="col">Date</th>
            {user.adminRole && (
              <Fragment>
                <th scope="col"></th>
                <th scope="col"></th>
              </Fragment>
            )}
          </tr>
        </thead>
        <tbody>
          {user.adminRole
            ? customer.map((item, index) => {
                return (
                  <Fragment>
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.job}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.createdBy}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setUserId(item._id)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteCustomer(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })
            : customer
                .filter((item) => item.createdBy === user.name)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.job}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.createdBy}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                    </tr>
                  );
                })}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Customer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form">
                <div className="input-group my-4">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    placeholder="Full Name"
                    name="name"
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
                    ref={inputAddressRef}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => saveChanges(userId)}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
