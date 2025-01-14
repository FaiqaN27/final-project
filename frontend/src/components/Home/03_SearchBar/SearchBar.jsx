import './SearchBar.css';
import { CiLocationOn } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkMinus } from "react-icons/ci";
import { useRef } from 'react';
import { BASE_URL } from '../../../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const locationRef = useRef('');
    const maxGroupSizeRef = useRef(0);
    const minPriceRef = useRef(0);
    const maxPriceRef = useRef(0);
    const navigate = useNavigate();

    const SearchHandler = async () => {
        const location = locationRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;
        const minPrice = minPriceRef.current.value;
        const maxPrice = maxPriceRef.current.value;

        if (location === '' || maxGroupSize === '' || minPrice === '' || maxPrice === '') {
            return alert('All fields are required!');
        }

        const res = await fetch(`${BASE_URL}/v1/tours/search/getTourBySearch?country=${location}&maxGroupSize=${maxGroupSize}&minPrice=${minPrice}&maxPrice=${maxPrice}`)

        if (!res.ok) alert('Something went wrong')

        const result = await res.json()

        navigate(`/search?country=${location}&maxGroupSize=${maxGroupSize}&minPrice=${minPrice}&maxPrice=${maxPrice}`, { state: result.data })
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 mb-5'>
                        <div className='search__bar'>
                            <form className='d-flex flex-wrap align-items-center gap-5'>

                                <div className='form-group d-flex gap-3 form__group form__group__first' >
                                    <span><CiLocationOn /></span>
                                    <div>
                                        <h6>Location</h6>
                                        <input className='form-control' type="text" placeholder='Where are you going? ' ref={locationRef} />
                                    </div>
                                </div>

                                <div className='form-group d-flex gap-3 form__group form__group__first' >
                                    <span><CiBookmarkMinus /></span>
                                    <div>
                                        <h6>Minimum Price</h6>
                                        <input className='form-control' type="number" placeholder='0' ref={minPriceRef} />
                                    </div>
                                </div>

                                <div className='form-group d-flex gap-3 form__group form__group__first' >
                                    <span><CiBookmarkPlus /></span>
                                    <div>
                                        <h6>Maximum Price</h6>
                                        <input className='form-control' type="number" placeholder='0' ref={maxPriceRef} />
                                    </div>
                                </div>

                                <div className='form-group d-flex gap-3 form__group form__group__last' >
                                    <span><FaUserGroup /></span>
                                    <div>
                                        <h6>Max People</h6>
                                        <input className='form-control' type="number" placeholder='0' ref={maxGroupSizeRef} />
                                    </div>
                                </div>

                                <div>
                                    <span className='search__icon' type='submit' onClick={SearchHandler}><IoSearchOutline /></span>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchBar;