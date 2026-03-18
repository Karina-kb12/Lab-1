const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Сервер працює');
});

app.listen(3000, () => {
    console.log('Сервер запущено: http://localhost:3000');
});