import React, { Fragment, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/register");
      setUsers(data);
    };
    getUsers();
  }, [users]);
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/register/${id}`);
    const notify = () => toast.success("Deleted");
    notify();
  };
  const updateUserToAdmin = async (id) => {
    await axios.patch(`http://localhost:5000/api/register/${id}`, {
      adminRole: true,
    });
    const notify = () => toast.success("Success");
    notify();
  };
  const removeAdminRole = async (id) => {
    await axios.patch(`http://localhost:5000/api/register/${id}`, {
      adminRole: false,
    });
    const notify = () => toast.success("Success");
    notify();
  };
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/register");
      setUsers(data);
    };
    getUsers();
  }, [users]);
  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="text-success">
                {user.email} {user.adminRole && "( Admin )"}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                {user.adminRole ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => removeAdminRole(user._id)}
                  >
                    Remove Admin Role
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateUserToAdmin(user._id)}
                  >
                    Add admin Role
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Users;
