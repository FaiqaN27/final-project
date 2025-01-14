import React, { useState } from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineTour } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdmSidebar = ({ openToggle, OpenSidebar }) => {
    const [isToursOpen, setIsToursOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const toggleTours = () => {
        setIsToursOpen(!isToursOpen);
    };

    const toggleGallery = () => {
        setIsGalleryOpen(!isGalleryOpen);
    }

    return (
        <aside id='sidebar' className={openToggle ? 'sidebar-responsive' : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    Admin
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>x</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item active'>
                    <Link to=''>
                        <AiOutlineDashboard className='icon' /> Dashboard
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <a onClick={toggleTours} >
                        <MdOutlineTour className='icon' /> Tours
                    </a>
                    {isToursOpen && (
                        <ul className='submenu'>
                            <li className='sidebar-list-item'>
                                <Link to='/Admin/all-tours'>
                                    All Tours
                                </Link>
                            </li>
                            <li className='sidebar-list-item'>
                                <Link to='/Admin/add-tour'>
                                    Add Tour
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li className='sidebar-list-item'>
                    <a onClick={toggleGallery} >
                        <GrGallery className='icon' /> Gallery
                    </a>
                    {isGalleryOpen && (
                        <ul className='submenu'>
                            <li className='sidebar-list-item'>
                                <Link to='/Admin/all-images'>
                                    All Images
                                </Link>
                            </li>
                            <li className='sidebar-list-item'>
                                <Link to='/Admin/add-image'>
                                    Add New Images
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li className='sidebar-list-item'>
                    <Link to='/Admin/all-bookings'>
                        <TbBrandBooking className='icon' /> Bookings
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to='/Admin/users'>
                        <IoPeople className='icon' /> Users
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to='/Admin/users-query'>
                        <FaQuestionCircle className='icon' /> Query
                    </Link>
                </li>

            </ul>
        </aside>
    )
}

export default AdmSidebar