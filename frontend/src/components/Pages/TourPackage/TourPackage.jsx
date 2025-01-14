import React, { useEffect, useState } from 'react';
import Heading from '../../Shared/Heading/Heading';
import SearchBar from '../../Home/03_SearchBar/SearchBar';
import './TourStyle.css';
import TourCards from '../../Home/06_TourDetails/TourCards';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

const TourPackage = () => {
    const [tours, setTours] = useState([]);
    const [tourCount, setTourCount] = useState(0); // Total tour count
    const [pageCount, setPageCount] = useState(0); // Total number of pages
    const [page, setPage] = useState(0); // Current page number
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchTours = async () => {
        setLoading(true);
        try {
            // Fetch paginated tours and total tour count
            const response = await axios.get(`${BASE_URL}/v1/tours?page=${page}`);
            const { data, totalTours } = response.data;

            setTours(data); // Set fetched tours
            setTourCount(totalTours); // Set total number of tours

            // Calculate total number of pages
            const totalPages = Math.ceil(totalTours / 8);
            setPageCount(totalPages); // Set total number of pages
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch tours");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, [page]);

    const handlePageClick = (number) => {
        setPage(number); // Set the page state to the selected page
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    return (
        <>
            <Heading title="Exclusive Tours" />
            <SearchBar />
            <section>
                <div className='container'>
                    {
                        loading && <center><div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden"></span>
                        </div></center>
                    }
                    {
                        error && <h3 className='alert alert-danger text-center my-5'>{error}</h3>
                    }
                    {!loading && !error &&
                        <div className='row'>
                            {tours?.map((tour) => (
                                <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={tour._id}>
                                    <TourCards tour={tour} />
                                </div>
                            ))}

                            {/* Pagination Section */}
                            <div className='col-lg-12'>
                                <div className='pagination d-flex align-items-center justify-content-center my-4 gap-3'>
                                    {[...Array(pageCount).keys()].map(number => (
                                        <span key={number}
                                            onClick={() => handlePageClick(number)}
                                            className={page === number ? "active__page" : ""}>
                                            {number + 1} {/* Show 1-based page numbers */}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
}

export default TourPackage;
