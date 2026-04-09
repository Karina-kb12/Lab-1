console.log("Спроба запуску сервера...");
const express = require('express');
const app = express();
const PORT = 3000;

const { initDb } = require('./db/initDb');

const logger = require('./middleware/logger.middleware');

const accessRequestRoutes = require('./routes/accessRequest.routes');
const userRoutes = require('./routes/user.routes');
const approvalRoutes = require('./routes/approval.routes');

app.use(logger);
app.use(express.json()); 

app.use('/api/access-requests', accessRequestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/approvals', approvalRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: err.message || "Щось пішло не так на сервері"
        }
    });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log("------------------------------------------");
        console.log(`Сервер запущено: http://localhost:${PORT}`);
        console.log("База даних готова до роботи.");
        console.log("Доступні маршрути:");
        console.log(" - POST/GET /api/users");
        console.log(" - POST/GET /api/access-requests");
        console.log(" - POST/GET /api/approvals");
        console.log("------------------------------------------");
    });
}).catch(err => {
    console.error("КРИТИЧНА ПОМИЛКА: База даних не ініціалізована!");
    console.error(err.message);
    process.exit(1);
});

console.log("Код ініціалізації завантажено.");