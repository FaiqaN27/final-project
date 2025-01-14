import React from 'react'
import Heading from '../../Shared/Heading/Heading'
import destinations from '../../../assets/data/Destination'
import { Link } from 'react-router-dom'

const AllDestinations = () => {
  return (
    <>
      <Heading title='All Destinations' />
      <div className='container'>
        <div className='row'>
          {destinations?.map((destination) => {
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

export default AllDestinations