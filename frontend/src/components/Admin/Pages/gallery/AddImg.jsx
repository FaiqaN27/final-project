import React, { useState } from 'react'
import { BASE_URL } from '../../../../utils/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddImg = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImgPreview(URL.createObjectURL(file)); // Create a preview URL
      setError(null);
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!image) {
      setError('Please select an image to upload.');
      return;
    }
    const formData = new FormData();

    formData.append('image', image);
    formData.append('type', 'gallery');

    try {
      const response = await axios.post(`${BASE_URL}/v1/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })

      if (response.status === 201) {
        setSuccess(true);
        setImage(null)
        setImgPreview(null);
        setTimeout(() => {
          navigate('/Admin/all-images');
        }, 2000);
      }
    }
    catch (error) {
      console.log("Error adding image:", error)
    }
  }

  return (
    <>
      <div className="container mt-4 mb-5 px-5">
        <h1 className="display-4 text-center mb-4">Add New Image</h1>
        <form className='add__form mx-5' onSubmit={handleAdd}>
          <div className="form-group col-lg-9 mb-3">
            <label htmlFor="image"><h5>Image:</h5></label>
            <input
              className='form-control'
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImgChange}
            />

            {/* Image Preview */}
            {imgPreview && (
              <div className="form-group col-lg-9 mb-3">
                <h5>Image Preview:</h5>
                <img src={imgPreview} alt="Preview" style={{ width: '300px', height: 'auto' }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-3 px-4" onClick={handleAdd}>
              Upload
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Image uploaded successfully!</div>}
      </div>
    </>
  )
}

export default AddImg