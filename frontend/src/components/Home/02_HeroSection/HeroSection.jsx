import React from 'react'
import './heroSection.css'

const HeroSection = () => {
    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col-lg-6'>
                    <div className='hero__content'>
                        <div className='hero__subtitle d-flex align-items-center'>
                            <span className='highlight_text'>Kwon Before You Go</span>
                        </div>
                        <h2>Traveling opens the door to creating <span className='highlight'>memories</span></h2>
                        <p> Exploring new horizons, one journey at a time.<br />
                            Traveling far and wide, with a heart full of wonder.<br />
                            Discovering hidden gems, and making memories to treasure.<br />
                            Where will the road take you next?<br />
                            Embracing the unknown, and finding beauty in every step.<br />
                            Travel, and let the world change you.</p>
                    </div>
                </div>

                <div className='col-lg-2'>
                    <div className='hero__img'>
                        <img src='../hero-img01.jpg' alt='boy in front of mirror place' />
                    </div>
                </div>

                <div className='col-lg-2 mt-4'>
                    <div className='hero__img'>
                        <video autoPlay
                            muted
                            loop
                            controls={false}
                            src='../hero_vid.mp4' alt='mountain climbing video'></video>
                    </div>
                </div>

                <div className='col-lg-2 mt-5'>
                    <div className='hero__img'>
                        <img src='../hero-img02.jpg' alt='boy on mountain top' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection