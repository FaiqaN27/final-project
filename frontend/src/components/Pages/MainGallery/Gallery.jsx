import React, { useState, useEffect } from 'react'
import Heading from '../../Shared/Heading/Heading'
import Masonry from "react-responsive-masonry"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import './gallery.css'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';


const Gallery = () => {

    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ img: '', i: 0 });

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v1/gallery`);
                setGallery(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch images");
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);



    const ImgView = (img, i) => {
        setData({ img, i });
    }

    const ImgAction = (action) => {
        let i = data.i;
        if (action === 'next' && i < gallery.length - 1) {
            setData({ img: gallery[i + 1].image, i: i + 1 });
        }
        else if (action === 'prev' && i > 0) {
            setData({ img: gallery[i - 1].image, i: i - 1 });
        }
        else if (!action) {
            setData({ img: '', i: 0 })
        }
    }

    return (
        <>
            {data.img &&
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        background: 'rgba(0,0,0,0.95)',
                        position: 'fixed',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <button className="close_btn" onClick={() => ImgAction()}>X</button>
                    <button
                        className='icon'
                        onClick={() => ImgAction('prev')}
                    > <IoIosArrowBack /></button>
                    <img
                        src={`http://localhost:3000${data.img}`}
                        style={{
                            width: 'auto',
                            maxHeight: '90%',
                            maxWidth: '90%'
                        }} />
                    <button
                        className='icon'
                        onClick={() => ImgAction('next')}
                    ><IoIosArrowForward /></button>
                </div>
            }

            <Heading title="Our Gallery" />

            <div className='gallery_container'>
                {loading && (
                    <center>
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </center>
                )}
                {error && <h3 className="text-center my-5">{error}</h3>}

                <Masonry
                    columnsCount={3}
                    gutter="10px">
                    {gallery?.map((image, index) => (
                        <img
                            className='photo'
                            key={image._id}
                            src={`http://localhost:3000${image.image}`}
                            onClick={() => ImgView(image.image, index)}
                            alt='gallery image'
                        />
                    ))}
                </Masonry>
            </div>
        </>
    )
}

export default Gallery