import './Contact.css';
import Heading from '../../Shared/Heading/Heading'
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from 'react';
import { BASE_URL } from '../../../utils/config';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/contact`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            // Handle successful response
            if (response.status === 201) {
                alert('Your query has been sent successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error(error);
            setStatus('Failed to send message. Please try again.');
        }
    };


    return (
        <>
            <Heading title="Contact Us" />
            <div className='contact-container'>
                <div className='box'>

                    <div className='contact form'>
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className='form-heading'>Feel Free to Contact Us!</h2>
                                <p className='form-para'>We’re just a message away! Reach out to us with any questions or concerns, and we’ll be happy to assist.</p>
                                <form onSubmit={handleSubmit} className="row">
                                    <div className="col-lg-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="phone"
                                            placeholder="Phone No"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <textarea name="message"
                                                placeholder='Write your Message'
                                                className="form-control border-0 shadow-none Msg_area"
                                                rows="12"
                                                cols="30"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                autoComplete="off"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12 text-right my-4" >
                                        <button type="submit" className="form-btn">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='contact info'>
                        <h2 className='info_heading'>Contact Info</h2>
                        <div className='info-box'>
                            <div>
                                <span className='location'><CiLocationOn /></span>
                                <p>Travel Trance, Islamabad <br /> PAKISTAN</p>
                            </div>

                            <div>
                                <span className='gmail'><CgMail /></span>
                                <a href='mailto: support@traveltrance.com'> support@traveltrance.com</a>
                            </div>

                            <div>
                                <span className='phone'><CiPhone /></span>
                                <a href='tel: +92 333 217 8922'>+92 333 217 8922</a>
                            </div>

                            {/* Socila Media Links */}
                            <ul className='social_media'>
                                <li className='fb'><a href=''><FaFacebookSquare /></a></li>
                                <li className='insta'><a href=''><FaInstagramSquare /></a></li>
                                <li className='x'><a href=''><FaSquareXTwitter /></a></li>
                                <li className='yt'><a href=''><FaYoutube /></a></li>
                                <li className='linkedin'><a href=''><FaLinkedin /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className='contact map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425298.3664918037!2d72.46288209027739!3d33.61455353044722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1722691436048!5m2!1sen!2s" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Contact