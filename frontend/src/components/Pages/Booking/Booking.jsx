import React, { useContext, useEffect, useState } from "react";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const Booking = ({ tour, avgRating }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { price, reviews, title, maxGroupSize } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id,
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    totalPrice: 0,
    status: "pending",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 50;
  const totalAmount = Number(price * booking.guestSize + serviceFee);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = user?.token || localStorage.getItem("token");
    console.log("Token being used:", token);

    if (!token) {
      alert("Please sign into book a tour");
      navigate("/login");
      return;
    }

    if (!user?.data || !user.data._id) {
      console.log(
        "User information missing or incomplete. Current user state:",
        user
      );
      alert("User information is incomplete. Please try logging in again.");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      return;
    }

    if (booking.guestSize > maxGroupSize) {
      alert(`Guest size cannot exceed ${maxGroupSize}`);
      return;
    }

    if (!booking.fullName || !booking.phone || !booking.bookAt) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        ...booking,
        userId: user.data._id,
        userEmail: user.data.email,
        tourId: id,
        totalPrice: totalAmount,
      };

      const res = await axios.post(`${BASE_URL}/v1/booking`, bookingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setTimeout(() => {
          navigate("/thank-you");
        }, 2000);
      } else {
        throw new Error(res.data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response && err.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      } else {
        const errorMsg =
          err.response?.data?.message || err.message || "Something went wrong";
        setError(errorMsg);
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span> / per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <FaStar style={{ color: "var(--secondary-color)" }} />
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <form className="booking__info-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={booking.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Phone No"
              id="phone"
              required
              value={booking.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              value={booking.bookAt}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              min="1"
              max={maxGroupSize}
              value={booking.guestSize}
              onChange={handleChange}
            />
          </div>

          <div className="booking__bottom">
            <div className="list-group">
              <div className="list-group-item border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  ${price} <IoClose /> {booking.guestSize} person
                  {booking.guestSize > 1 ? "s" : ""}
                </h5>
                <span>${price * booking.guestSize}</span>
              </div>

              <div className="list-group-item border-0 px-0">
                <h5>Service Charge</h5>
                <span>${serviceFee}</span>
              </div>

              <div className="list-group-item total border-0 px-0">
                <h5>Total</h5>
                <span>${totalAmount}</span>
              </div>
            </div>

            <button
              className="btn book__btn w-100 mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
