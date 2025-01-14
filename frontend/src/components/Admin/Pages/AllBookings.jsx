import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/v1/booking`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }, { withCredentials: true });
                setBookings(res.data.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center display-4">All Bookings</h2>
            {
                loading && <center><div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden"></span>
                </div></center>
            }
            {
                error && <h3 className='text-center my-5'>{error}</h3>
            }
            <div className="row">
                {bookings.map(booking => (
                    <div className="col-md-4 mb-4" key={booking._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{booking.tourName}</h5>
                                <p className="card-text"><strong>Full Name:</strong> {booking.fullName}</p>
                                <p className="card-text"><strong>Phone No:</strong> {booking.phone}</p>
                                <p className="card-text"><strong>Guest Size:</strong> {booking.guestSize}</p>
                                <p className="card-text"><strong>Booked At:</strong> {new Date(booking.bookAt).toLocaleString()}</p>
                                <p className="card-text"><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBookings;
