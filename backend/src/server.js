const express = require('express');
const cors = require('cors');
const middleware = require('./middleware');

const app = express();
const port = 3001;

app.use(cors());

app.use(middleware.decodeToken);

app.get('/api/todos', (req, res) => {
    console.log('----- req.user', JSON.stringify(req.user, null, 4));

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
