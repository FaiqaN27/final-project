import React from 'react'
import { CgArrowLongRight } from "react-icons/cg";
import './about.css'
import { Link } from "react-router-dom";

const About = () => {
    return (
        <>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 text-md-left">
                        <div className="about_content">
                            <h2 className="font-weight-bold mb-4 display-4" style={{ fontFamily: 'Kaushan Script' }}>
                                Travel Discoveries
                            </h2>
                            <p className='about_para'>
                                Welcome to <strong>TravelTrance</strong>, your ultimate travel companion. We're a team of travel enthusiasts dedicated to making your travel dreams a reality. Our story began with a group of friends who shared a passion for travel and exploration, and were tired of the same old travel experiences. We wanted to create something more personalized, more immersive, and more meaningful, so we set out to build a platform that would connect travelers with local experts and unique experiences.
                                <br /><br />
                                We are committed to offering travel services of the highest quality, combining our energy and enthusiasm, with our years of experience. Our greatest satisfaction comes in serving large numbers of satisfied clients who have experienced the joys and inspiration of travel.
                            </p>
                            <div className='about-link-container'>
                                <Link to='/about' className="about_link">Learn more</Link><span className="about_right_arrow"><CgArrowLongRight /></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 text-center mt-5 mb-3 mb-lg-0">
                        <img className="img-fluid" src="./adv1.jpg" alt="adventure image" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default About
