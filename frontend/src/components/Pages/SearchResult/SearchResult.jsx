import React, { useState } from 'react'
import Heading from '../../Shared/Heading/Heading'
import { useLocation } from 'react-router-dom'
import TourCards from '../../Home/06_TourDetails/TourCards';

const SearchResult = () => {

    const location = useLocation();
    const [data] = useState(location.state);
    console.log(data);

    return (
        <>
            <Heading title='Search Results' />
            <section>
                <div className='container'>
                    <div className='row'>
                        {
                            data.length === 0 ? <h1 className='text-center my-5'>No Tour found</h1> : data?.map(tour =>
                                <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={tour._id}><TourCards tour={tour} /></div>)
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchResult