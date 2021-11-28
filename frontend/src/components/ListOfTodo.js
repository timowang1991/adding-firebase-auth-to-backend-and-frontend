import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListOfTodo ({ token }) {
    const [todos, setTodos] = useState([]);

    const fetchData = async (token) => {
        const res = await axios.get('http://localhost:3001/api/todos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        setTodos(res.data.todos);
    }

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);

    console.log('----- todos', todos);

    return (
        <div>
            <h1>List of todo</h1>
            <ul>
            {
                todos.map((todo, idx) => <li key={`${idx}-${todo.title}`}>{todo.title}</li>)
            }
            </ul>
        </div>
    );
}