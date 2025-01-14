import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import './tourCard.css'
import { Link } from "react-router-dom";
import avgRatingCalculate from "../../../utils/avgRating";

const TourCards = ({ tour }) => {
  const { _id, image, country, title, price, reviews } = tour;

  const imageUrl = `http://localhost:3000${image}`;

  const { totalRating, avgRating } = avgRatingCalculate(reviews);

  return (
    <>
      <div className="tour__card">
        <div className="card">
          <div className="tour__img">
            <img src={imageUrl} alt="tour-img" />
          </div>

          <div className="card-body">
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1"><CiLocationOn />{country}</span>

              <span className="tour__rating d-flex align-items-center gap-1"><FaStar />
                {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? (
                  "Not rated"
                ) : (
                  <span>({reviews?.length})</span>
                )}

              </span>
            </div>

            <h5 className="tour__title"><Link to={`/tour-details/${_id}`}>{title}</Link></h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>{price}$<span> /per person</span></h5>

              <button className="btn booking__btn">
                <Link to={`/tour-details/${_id}`}>Book Now</Link>
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  )
};

export default TourCards;
