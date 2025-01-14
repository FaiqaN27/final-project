import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../../utils/config';
import { useState, useEffect } from 'react';

const AllImg = () => {

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/gallery`);
      setGallery(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/v1/gallery/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust the endpoint as needed
      alert("Image deleted successfully!");
      fetchGallery(); // Refresh the list after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete the Image");
    }
  }

  return (
    <>
      <div className='container mt-4 px-5'>
        <h1 className='display-4 text-center mb-4'>Gallery</h1>
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
            {gallery?.map((image) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={image._id}>
                <div className="card adm__card">

                  <img
                    src={`http://localhost:3000${image.image}`}
                    className="card-img-top img-fluid" alt='image'
                    style={{ height: '200px', objectFit: 'cover' }} />

                  <button className='btn btn-danger adm__btn' onClick={() => handleDelete(image._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  )
}

export default AllImg