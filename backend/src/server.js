const express = require('express');

const app = express();

const port = 3001;

app.get('/api/todos', (req, res) => {
    return res.json({
        todos: [
            {
                title: 'task1'
            },
            {
                title: 'task2'
            },
            {
                title: 'task3'
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
