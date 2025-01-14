import React from 'react'
import './Heading.css'

const Heading = ({ title }) => {
    return (
        <div className='banner'>
            <div className='container'>
                <div className='row text-center'>
                    <div className='col-lg-12'>
                        <h2 className='banner-text'>{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading