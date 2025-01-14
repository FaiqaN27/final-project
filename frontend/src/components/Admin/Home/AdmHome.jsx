import React, { useEffect, useState } from 'react'
import { TbBrandBooking } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { MdOutlineTour } from "react-icons/md";
import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';


const AdmHome = () => {

    const token = localStorage.getItem('token');

    const [bookings, setBookings] = useState(0);
    const [tours, setTours] = useState(0);
    const [users, setUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    // Function to fetch counts from the backend
    const fetchCounts = async () => {
        try {
            const [bookings, tours, users] = await Promise.all([
                axios.get(`${BASE_URL}/v1/booking`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                ,
                axios.get(`${BASE_URL}/v1/tours`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                axios.get(`${BASE_URL}/v1/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            ]);

            setBookings(bookings.data.data.length);
            setTours(tours.data.data.length);
            setUsers(users.data.data.length);
        } catch (error) {
            console.error("Error fetching counts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);


    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>DASHBOARD</h2>
            </div>

            <div className='main-cards'>

                <div className='Card'>
                    <div className='card-inner'>
                        <h3>BOOKINGS</h3>
                        <TbBrandBooking className='card-icon' />
                    </div>
                    <h1>{bookings}</h1>
                </div>

                <div className='Card'>
                    <div className='card-inner'>
                        <h3>TOURS</h3>
                        <MdOutlineTour className='card-icon' />
                    </div>
                    <h1>{tours}</h1>

                </div>

                <div className='Card'>
                    <div className='card-inner'>
                        <h3>USERS</h3>
                        <IoPeople className='card-icon' />
                    </div>
                    <h1>{users}</h1>
                </div>

            </div>
        </main>
    )
}

export default AdmHome