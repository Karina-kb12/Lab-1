const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/initDb');
const logger = require('./middleware/logger.middleware');

const accessRequestRoutes = require('./routes/accessRequest.routes');
const userRoutes = require('./routes/user.routes');
const approvalRoutes = require('./routes/approval.routes');

const app = express();
const PORT = 3000;

app.use(logger);

app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

app.use('/api/v1/access-requests', accessRequestRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/approvals', approvalRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        status: status,
        title: status === 500 ? "Internal Server Error" : "Request Error",
        message: err.message || "Щось пішло не так",
        details: err.errors || null 
    });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\x1b[32m%s\x1b[0m`, `API Сервер запущено на http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Помилка БД:", err.message);
    process.exit(1);
});