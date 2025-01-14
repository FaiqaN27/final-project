import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { CgArrowLongRight } from "react-icons/cg";
import 'swiper/css';
import "swiper/css/effect-coverflow";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperCarousel.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const SwiperCarousel = () => {

    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ img: '', i: 0 });

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v1/gallery`);
                setGallery(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch images");
            }
        };

        fetchGallery();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row " >
                    <div className="col-lg-10 col-md-10 col-sm-9">
                        <h2 className="gall_heading">Our Gallery</h2>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3'>
                        <Link to='/gallery' className="gallery_link">See more</Link><span className="gall_right_arrow justify-content-end "><CgArrowLongRight /></span>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={
                        {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }
                    }
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    className='swiper_container'
                >
                    {gallery?.map((image) => (
                        <SwiperSlide className='swiper-slider' key={image._id} >
                            <img
                                src={`http://localhost:3000${image.image}`}
                                alt="tour_image" />
                        </SwiperSlide>
                    ))}

                    <div className='slider-controller'>
                        <div className='swiper-button-prev slider-arrow'>
                            <IoIosArrowBack />
                        </div>

                        <div className='swiper-button-next slider-arrow'>
                            <IoIosArrowForward />
                        </div>
                    </div>

                </Swiper>
            </div>
        </>
    )
}

export default SwiperCarousel;