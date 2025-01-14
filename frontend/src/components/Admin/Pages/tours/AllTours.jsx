import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../utils/config';

const AllTours = () => {

    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    const fetchTours = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/tours`);
            setTours(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch tours");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleEdit = (id) => {
        navigate(`/Admin/edit-tour/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
            try {
                await axios.delete(`${BASE_URL}/v1/tours/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); // Adjust the endpoint as needed
                alert("Tour deleted successfully!");
                fetchTours(); // Refresh the list after deletion
            } catch (err) {
                alert(err.response?.data?.message || "Failed to delete the tour");
            }
        }
    };

    return (
        <div className='container mt-4 px-5'>
            <h1 className='display-4 text-center mb-4'>All Tours</h1>
            {
                loading && <center><div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden"></span>
                </div></center>
            }
            {
                error && <h3 className='alert alert-danger text-center my-5'>{error}</h3>
            }
            {!loading && !error &&
                <div className="row">
                    {tours?.map((tour) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={tour._id}>
                            <div className="card adm__card">
                                <img src={`http://localhost:3000${tour.image}`} className="card-img-top img-fluid" alt={tour.location} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body adm__cardBody">
                                    <h4 className="card-title">{tour.title}</h4>
                                    <p className="card-text"><strong>Country:</strong> {tour.country}</p>
                                    <p className="card-text"><strong>Duration:</strong> {tour.duration} days</p>
                                    <p className="card-text"><strong>Description:</strong> {tour.description}</p>
                                    <p className="card-text"><strong>Price:</strong> ${tour.price}</p>
                                    <p className="card-text"><strong>Max Group Size:</strong> {tour.maxGroupSize}</p>
                                    <p className="card-text"><strong>Reviews:</strong> {tour.reviews.length}</p>
                                    <p className="card-text"><strong>Hotel Name:</strong> {tour.hotelDetails.name}</p>
                                    <p className="card-text"><strong>Hotel Location:</strong> {tour.hotelDetails.location}</p>
                                    <div className="d-flex justify-content-evenly">
                                        <button className='btn btn-primary adm__btn' onClick={() => handleEdit(tour._id)}>
                                            Edit
                                        </button>
                                        <button className='btn btn-danger adm__btn' onClick={() => handleDelete(tour._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default AllTours;
