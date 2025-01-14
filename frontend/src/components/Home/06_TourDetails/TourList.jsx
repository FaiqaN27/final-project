import React from 'react'
import { Link } from "react-router-dom";
import { CgArrowLongRight } from "react-icons/cg";
import TourCards from './TourCards';
import './TourList.css'
import useFetch from '../../../hooks/useFetch';
import { BASE_URL } from '../../../utils/config';

const TourList = () => {
    const { data: tours, loading, error } = useFetch(`${BASE_URL}/v1/tours`)

    return (
        <>
            <div className="container mb-4 pt-4">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-9">
                        <h2 className="tour_heading">Exclusive Tours </h2>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3'>
                        <Link to='/tour' className="tour_link">See all tours</Link><span className="tour_right_arrow"><CgArrowLongRight /></span>
                    </div>
                </div>
            </div>
            {
                loading && <center><div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden"></span>
                </div></center>
            }
            {
                error && <h3 className='text-center my-5'>{error}</h3>
            }
            <div className='container mb-4'>
                <div className='row'>

                    {!loading && !error && tours?.slice(0, 4).map((tour) => {
                        return (
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={tour._id}><TourCards tour={tour} /></div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TourList