Лабораторна робота No2: Розробка REST API для системи керування доступом
Даний проект реалізує серверний додаток для керування заявками на доступ до об'єктів інфраструктури. API побудовано на Node.js з використанням Express та дотриманням архітектури багатошарового застосунку (Layered Architecture).

Як запустити проект
Встановлення залежностей:
Переконайтеся, що ви знаходитесь у папці backend, та виконайте:

Bash
npm install
Запуск сервера:

Bash
node src/server.js
Сервер працюватиме за адресою: http://localhost:3000

Реалізовані сутності (Варіант: Менеджер заявок)
Проект реалізує повний CRUD-цикл для наступних сутностей:

Users — користувачі (Admin встановлений за замовчуванням).

AccessRequests — запити на доступ.

Поля: id (UUID), userName, date, accessType, comments, status (за замовчуванням Pending).

Approvals — підтвердження або відхилення запитів.

Архітектура проекту
Код структурований за функціональним призначенням:

Routes — визначення маршрутів API.

Controllers — обробка вхідних HTTP-запитів та валідація даних.

Services — реалізація бізнес-логіки.

Repositories — керування даними в оперативній пам'яті (In-memory storage).

DTOs — об'єкти передачі даних.

Middleware — логування запитів та централізована обробка помилок.

Приклади запитів (curl)
1. Отримання списку всіх запитів (GET)
Bash
curl.exe http://localhost:3000/api/access-requests
2. Створення нового запиту (POST)
Bash
curl.exe -X POST http://localhost:3000/api/access-requests -H "Content-Type: application/json" -d "{\"userName\": \"Karyna\", \"date\": \"2026-03-19\", \"accessType\": \"Laboratory\"}"
3. Оновлення запиту (PUT)
Bash
curl.exe -X PUT http://localhost:3000/api/access-requests/{UUID} -H "Content-Type: application/json" -d "{\"userName\": \"Karyna\", \"date\": \"2026-03-19\", \"accessType\": \"Laboratory\", \"status\": \"Approved\"}"
4. Видалення запиту (DELETE)
Bash
curl.exe -X DELETE http://localhost:3000/api/access-requests/{UUID}
Валідація та помилки
Сервер перевіряє обов'язкові поля (userName, date, accessType). У разі помилки повертається статус 400 Bad Request:

JSON
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields"
  }
}
Також реалізовано обробку помилки 404 Not Found для неіснуючих ресурсів та 500 для внутрішніх помилок сервера.