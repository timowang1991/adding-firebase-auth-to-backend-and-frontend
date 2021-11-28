import React, { useEffect } from 'react';
import axios from 'axios';

export default function ListOfTodo ({ token }) {
    const fetchData = async (token) => {
        const res = await axios.get('http://localhost:3001/api/todos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
    }

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);

    return (
        <div>
            <h1>List of todo</h1>
        </div>
    );
}