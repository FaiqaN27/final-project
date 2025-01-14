import React, { useEffect, useState } from 'react'
import Heading from '../../Shared/Heading/Heading'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import TourCards from '../../Home/06_TourDetails/TourCards'
import { useParams } from 'react-router-dom'

const Destination = () => {
    const { destinationName } = useParams();
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v1/tours/country/${destinationName}`);  // Fetch tours by country
                setTours(response.data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, [destinationName]);

    return (
        <>
            <Heading title={`${destinationName} Tours`} />
            <div className="container">
                <div className="row">
                    {tours.length > 0 ? (
                        tours.map(tour => (
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={tour._id}><TourCards tour={tour} /></div>
                        ))
                    ) : (
                        <p className='text-center my-5' style={{ fontSize: '2.5rem' }}>No tours available for this destination.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Destination

