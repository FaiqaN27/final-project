import React from 'react'
import './newsletter.css'
import image from '/tourist.png'

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("emailInput").value.trim();

        if (emailInput === "") {
            alert("Please enter your email address before subscribing.");
        } else {
            alert("Thank You for Subscription!");
        }
    }
    return (
        <section className='newsletter'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='newsletter__content'>
                            <h2>Subscribe now to get useful traveling information.</h2>

                            <div className='newsletter__input'>
                                <input type='email' placeholder='Enter your email' id='emailInput' />
                                <button className='btn newsletter__btn' onClick={handleSubscribe}>Subscribe</button>
                            </div>

                            <p>Explore new destinations and experiences. Subscribe for travel updates, tips, and inspiration. Start planning your dream trip today!</p>

                        </div>
                    </div>

                    <div className='col-lg-6 col-md-12'>
                        <img className='newsletter__img' src={image} alt='Male tourist image' />
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Newsletter