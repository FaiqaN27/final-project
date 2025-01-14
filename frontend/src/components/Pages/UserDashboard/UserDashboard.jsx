import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  //   const fetchUserBookings = async () => {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/v1/booking/`, { userid: match.params.user._id }).data;
  //       setUserBookings(res.data.data)
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     }
  //   };

  //   fetchUserBookings();
  // }, [token]);

  return (
    <div>
      <h2 className="display-4 text-center my-5">My Profile</h2>
      <hr />
      <div className="row" style={{ fontSize: '1.3rem' }}>
        <div className="col-md-4 mb-4" key={user._id}>
          <div className="card mx-3">
            <div className="card-body">
              <p className="card-text"><strong>Email:</strong> {user.data.email}</p>
              <p className="card-text"><strong>Name:</strong> {user.data.username}</p>
              <p className="card-text"><strong>Role:</strong> User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


