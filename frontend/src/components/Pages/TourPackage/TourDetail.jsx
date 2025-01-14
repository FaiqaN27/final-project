import React, { useContext, useEffect, useRef, useState } from "react";
import "./TourStyle.css";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { FaHourglassStart } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { RiGroupLine } from "react-icons/ri";
import avatar from "../../../assets/Images/avatar.jpg";
import avgRatingCalculate from "../../../utils/avgRating";
import Booking from "../Booking/Booking";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";

const TourDetail = () => {
  const { id } = useParams("");
  const reviewMsgRef = useRef();
  const [tour, setTour] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get stored user data
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Get username from the stored user data structure
  const username = storedUser?.data?.username || storedUser?.username || "";

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/v1/tours/${id}`);
        setTour(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tour details");
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const {
    image,
    country,
    title,
    duration,
    description,
    price,
    maxGroupSize,
    reviews,
    hotelDetails,
  } = tour || {};

  const imageUrl = `http://localhost:3000${image}`;
  const { totalRating, avgRating } = avgRatingCalculate(reviews || []);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!token || !username) {
      alert("Please login to submit a review");
      return;
    }

    // Check if rating is selected
    if (!tourRating) {
      alert("Please select a rating");
      return;
    }

    const reviewText = reviewMsgRef.current.value;

    const reviewObj = {
      username: username,
      reviewText,
      rating: tourRating,
    };

    try {
      const res = await axios.post(`${BASE_URL}/v1/review/${id}`, reviewObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear the review form
      reviewMsgRef.current.value = "";
      setTourRating(null);

      // Refresh the tour data to show the new review
      const updatedTour = await axios.get(`${BASE_URL}/v1/tours/${id}`);
      setTour(updatedTour.data.data);

      alert(res.data.message);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit the review";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <div className="container">
          {loading && (
            <center>
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </center>
          )}
          {error && <h3 className="text-center my-5">{error}</h3>}

          {!loading && !error && (
            <div className="row">
              <div className="col-lg-8">
                <div className="tour__content">
                  <img src={imageUrl} alt="tour image" />

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <FaStar style={{ color: "#faa935" }} />
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <FaHourglassStart className="tour__icon" />
                        {duration} days
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <TiLocation className="tour__icon" />
                        {country}
                      </span>
                      <span>
                        <BiDollarCircle className="tour__icon" />${price} /per
                        person
                      </span>
                      <span>
                        <RiGroupLine className="tour__icon" />
                        {maxGroupSize} people
                      </span>
                    </div>

                    <h5>Description</h5>
                    <p>{description}</p>

                    <h5>Hotel Details</h5>
                    <p>Name: {hotelDetails?.name}</p>
                    <p>Location: {hotelDetails?.location}</p>
                    <p>Rooms will be provided upon arrival of guests</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTourRating(star)}
                            style={{
                              cursor: "pointer",
                              color: tourRating >= star ? "#faa935" : "#acacac",
                            }}
                          >
                            {star} <FaStar />
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          required
                          placeholder="Share your thoughts!"
                        />
                        <button
                          className="btn submit__btn text-white"
                          disabled={!token || !username}
                        >
                          Submit
                        </button>
                      </div>
                    </form>

                    <div className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="user" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}{" "}
                                <FaStar style={{ color: "#faa935" }} />
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <Booking tour={tour} avgRating={avgRating} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TourDetail;
