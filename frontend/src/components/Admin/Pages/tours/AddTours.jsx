import React, { useState, useRef } from 'react'
import '../AdmPages.css'
import axios from 'axios';
import { BASE_URL } from '../../../../utils/config';

const AddTours = () => {
    const token = localStorage.getItem('token'); // Retrieve the stored token

    const [addTour, setAddTour] = useState({
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

    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name in addTour.hotelDetails) { //name is avaliable in hotelDetails
            setAddTour(prevState => ({  //addTour previous values prevState
                ...prevState,
                hotelDetails: {
                    ...prevState.hotelDetails,
                    [name]: value
                }
            }));
        } else {
            setAddTour(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file); // Check the file object
        setImage(file); // Store the file object
        if (file) {
            setImgPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append the addTour data to formData
        Object.keys(addTour).forEach(key => {
            if (key === "hotelDetails") {
                // Send hotel details as a JSON string
                formData.append('hotelDetails', JSON.stringify(addTour.hotelDetails));
            } else {
                formData.append(key, addTour[key]);
            }
        });

        // Append the image file to formData
        if (image) {
            formData.append('image', image);
        }
        formData.append('type', 'tour'); // Specify the type as 'tour'

        try {
            const response = await axios.post(`${BASE_URL}/v1/tours`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });


            // Handle successful response
            console.log(response.data);
            setAddTour({
                title: '',
                country: '',
                duration: '',
                price: '',
                description: '',
                maxGroupSize: '',
                hotelDetails: {
                    name: '',
                    location: '',
                },
                image: '',
            });
            setImgPreview(null);
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error("Error adding tour:", error);
        }
    };


    return (
        <div className="container mt-4 mb-5 px-5">
            <h1 className="display-4 text-center mb-4">Add New Tour</h1>
            <form className='add__form mx-5' onSubmit={handleAdd}>

                <div className="form-group col-lg-9 mb-3 ">
                    <label htmlFor='location'><h5>Location:</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='title'
                        name="title"
                        value={addTour.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='country'><h5>Country:</h5></label>
                    <select
                        className='form-control'
                        id="country"
                        name="country"
                        value={addTour.country}
                        onChange={handleInputChange}
                        required >
                        <option value="" disabled >------------------------------</option>
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
                        rows={5} cols={20}
                        style={{ resize: 'none' }}
                        value={addTour.description}
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
                        value={addTour.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-9 mb-3">
                    <label htmlFor='duration'><h5>Duration(days):</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        id='duration'
                        name="duration"
                        value={addTour.duration}
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
                        value={addTour.maxGroupSize}
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
                        value={addTour.hotelDetails.name}
                        onChange={handleInputChange}
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
                        value={addTour.hotelDetails.location}
                        onChange={handleInputChange}
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
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>
                {/* Image Preview */}
                {imgPreview && (
                    <div className="form-group col-lg-9 mb-3">
                        <h5>Image Preview:</h5>
                        <img src={imgPreview} alt="Preview" style={{ width: '250px', height: 'auto' }} />
                    </div>
                )}


                <button type="submit" className="btn btn-primary mt-3 px-4">
                    Add Tour
                </button>
            </form>
        </div>
    )
}

export default AddTours