import React from 'react'
import './destination.css'
import { Link } from "react-router-dom";
import { CgArrowLongRight } from "react-icons/cg";
import destinations from '../../../assets/data/Destination';

const DestinationCards = () => {

    return (
        <>
            <div className="container mb-4 pt-4">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-9">
                        <h2 className="des_heading">Explore Destinations</h2>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3'>
                        <Link to='/all-destinations' className="tour_link">See all destinations</Link><span className="tour_right_arrow"><CgArrowLongRight /></span>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row'>
                    {destinations?.slice(0, 6).map((destination) => {
                        return (
                            <div className='col-lg-2 col-md-3 col-sm-4 mb-3' key={destination.id}>
                                <div className='destination__img'>
                                    <Link to={`/destination/${destination.name}`}>
                                        <img src={destination.image} alt={destination.name} />
                                    </Link>
                                    <div className='destination__text'>
                                        <h3>{destination.name}</h3>
                                        <p>{destination.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>

        </>
    )
}

export default DestinationCards