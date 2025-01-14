import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './thankYou.css';

const ThankYou = () => {
    return (
        <section>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 py-5 text-center'>
                        <div className='thank__you'>
                            <span><FaRegCircleCheck /></span>
                            <h1 className='mb-3'>Thank you</h1>
                            <h3 className='mb-4'>Your Tour Is Booked. We will contact you soon!</h3>

                            <button className='btn home__btn'><Link to='/'>Back To Home</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThankYou