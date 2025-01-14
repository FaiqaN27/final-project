import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";

const Query = () => {

  const [UsersQuery, setUsersQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch queries when component mounts
  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
      setUsersQuery(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleResponse = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust the endpoint as needed
      alert("Respose deleted successfully!");
      fetchQueries(); // Refresh the list after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center mb-4">All Queries</h1>
      {loading ? (
        <h2 className="text-center text-white">Loading...</h2>
      ) : UsersQuery.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr className="user_table_heading">
                <th scope="col">
                  <h5>First Name</h5>
                </th>
                <th scope="col">
                  <h5>Last Name</h5>
                </th>
                <th scope="col">
                  <h5>Email</h5>
                </th>
                <th scope="col">
                  <h5>Phone</h5>
                </th>
                <th scope="col">
                  <h5>Message</h5>
                </th>
                <th scope="col">
                  <h5>Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {UsersQuery.map((query) => (
                <tr key={query._id} className="user__details my-2">
                  <td>{query.firstName}</td>
                  <td>{query.lastName}</td>
                  <td>{query.email}</td>
                  <td>{query.phone}</td>
                  <td>{query.message}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mx-2"
                      onClick={() => handleResponse(query.email)}
                    >
                      Response
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(query._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center display-2 text-white mt-5">
          No Query At All
        </h1>
      )}
    </div>
  );
};

export default Query;
