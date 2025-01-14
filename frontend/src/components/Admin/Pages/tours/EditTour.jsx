import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../AdmPages.css'
import { BASE_URL } from '../../../../utils/config'

const EditTour = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [tour, setTour] = useState({
        title: '',
        country: '',
        duration: '',
        price: '',
        description: '',
        maxGroupSize: '',
        hotelDetails: {
            name: '',
            location: ''
        },
        image: ''
    });
    const [previewImage, setPreviewImage] = useState();
    const [formData, setFormData] = useState(new FormData());

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v1/tours/${id}`);
                const fetchedTour = response.data.data;
                setTour(fetchedTour);
                setPreviewImage(`http://localhost:3000${fetchedTour.image}`);
            } catch (error) {
                console.error("Failed to fetch the tour data:", error);
                alert("Failed to load tour data. Please try again later.");
            }
        };
        fetchTour();
    }, [id]);

    const token = localStorage.getItem('token');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTour({ ...tour, [name]: value });
    };

    const handleHotelInputChange = (e) => {
        const { name, value } = e.target;
        setTour(prevTour => ({
            ...prevTour,
            hotelDetails: {
                ...prevTour.hotelDetails,
                [name]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // Display the new image preview
            formData.append('image', file); // Add the new image to form data
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Add all tour data to the FormData object, including the hotel details
        formData.append('title', tour.title);
        formData.append('country', tour.country);
        formData.append('description', tour.description);
        formData.append('price', tour.price);
        formData.append('duration', tour.duration);
        formData.append('maxGroupSize', tour.maxGroupSize);
        formData.append('hotelDetails[name]', tour.hotelDetails.name);
        formData.append('hotelDetails[location]', tour.hotelDetails.location);

        try {
            await axios.put(`${BASE_URL}/v1/tours/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);

            setTimeout(() => {
                navigate(`/Admin/all-tours`);
            }, 2000);
        } catch (error) {
            console.error("Failed to update the tour:", error);
            alert("Failed to update the tour. Please try again.");
        }
    };

    return (
        <div className="container mt-4 mb-5 px-5">
            <h1 className="display-4 text-center mb-4">Edit Tour</h1>
            <form className='edit__form mx-5' onSubmit={handleSave}>
                <div className="form-group col-lg-9 mb-3 ">
                    <label htmlFor='location'><h5>Location:</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='title'
                        name="title"
                        value={tour.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='country'><h5>Country:</h5></label>
                    <select
                        className='form-control'
                        id="country"
                        name="country"
                        value={tour.country}
                        onChange={handleInputChange}
                        required >
                        <option disabled>------------------------------</option>
                        <option>France</option>
                        <option>Japan</option>
                        <option>USA</option>
                        <option>Italy</option>
                        <option>Australia</option>
                        <option>Pakistan</option>
                        <option>UAE</option>
                        <option>Spain</option>
                        <option>China</option>
                        <option>India</option>
                        <option>England</option>
                        <option>Turkiye</option>
                    </select>
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='description'><h5>Description: </h5></label>
                    <textarea
                        className="form-control"
                        id='description'
                        name="description"
                        rows={5}
                        style={{ resize: 'none' }}
                        value={tour.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='price'><h5>Price:</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        id='price'
                        name="price"
                        value={tour.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='duration'><h5>Duration (days):</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='duration'
                        name="duration"
                        value={tour.duration}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='maxGroupSize'><h5>Max Group Size:</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        id="maxGroupSize"
                        name="maxGroupSize"
                        value={tour.maxGroupSize}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='hotelName'><h5>Hotel Name:</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='hotelName'
                        name="name"
                        value={tour.hotelDetails.name}
                        onChange={handleHotelInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='hotelLocation'><h5>Hotel Location:</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='hotelLocation'
                        name="location"
                        value={tour.hotelDetails.location}
                        onChange={handleHotelInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor="image"><h5>Image:</h5></label>
                    <input
                        className='form-control'
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {previewImage && (
                    <div className="form-group col-lg-9 mb-3">
                        <label><h5>Current Image:</h5></label>
                        <div>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary mt-3 px-4">
                    Save Changes
                </button>
            </form>

            {error && (
                <div className="alert alert-danger mt-3 col-lg-9">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success mt-3 col-lg-9">
                    Tour updated successfully! Redirecting to the Tours List...
                </div>
            )}
        </div>
    )
}

{/* 
                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor="image"><h5>Image:</h5></label>
                    <input
                        className='form-control'
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {previewImage && (
                    <div className="form-group col-lg-9 mb-3">
                        <label><h5>Current Image:</h5></label>
                        <div>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary mt-3 px-4">
                    Save Changes
                </button>
            </form>

            {error && (
                <div className="alert alert-danger mt-3 col-lg-9">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success mt-3 col-lg-9">
                    Tour updated successfully! Redirecting to the Tours List...
                </div>
            )}

        </div> */}

export default EditTour