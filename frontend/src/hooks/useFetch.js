import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await axios.get(url)

                setData(res.data.data);
                //Assuming `data` key holds your actual data in response
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data : err.message);  // More detailed error handling
                setLoading(false);
            }
        };
        fetchData();
    }, [url])

    return {
        data,
        error,
        loading
    }
}

export default useFetch