Markdown
# Лабораторна робота №3: Інтеграція SQLite та розробка багатошарового REST API

Даний проект реалізує серверну частину системи керування доступом до лабораторій. У цій версії додано персистентне збереження даних у базу SQLite, реалізовано повний CRUD-цикл та централізовану обробку помилок.

## 1. Порядок запуску проекту

Для коректної роботи додатка виконайте наступні кроки:

1. **Встановлення залежностей**:
   Переконайтеся, що ви знаходитесь у папці проекту і виконайте:
   ```bash
   npm install
Запуск сервера та ініціалізація БД:
Виконайте команду:

Bash
node src/server.js
При першому запуску додаток автоматично створить файл бази даних ./src/data/app.db, розгорне схему таблиць та наповнить їх тестовими даними (Seed).

2. Опис схеми бази даних
База даних SQLite містить 3 основні таблиці з наступними зв'язками та обмеженнями цілісності:

Таблиця Users (Користувачі)
id: INTEGER (PRIMARY KEY, AUTOINCREMENT)

name: TEXT (NOT NULL)

email: TEXT (UNIQUE, NOT NULL)

role: TEXT (CHECK (role IN ('Admin', 'Student')))

Таблиця AccessRequests (Заявки на доступ)
id: INTEGER (PRIMARY KEY, AUTOINCREMENT)

userId: INTEGER (FOREIGN KEY -> Users.id ON DELETE CASCADE)

resource: TEXT (NOT NULL) — Назва лабораторії

status: TEXT (Default: 'Pending')

Таблиця Approvals (Рішення по доступу)
id: INTEGER (PRIMARY KEY, AUTOINCREMENT)

requestId: INTEGER (FOREIGN KEY -> AccessRequests.id)

adminId: INTEGER (FOREIGN KEY -> Users.id)

decision: TEXT (NOT NULL) — Approved/Rejected

3. Приклади API-запитів (curl)
Отримання списку користувачів (Фільтрація, Сортування та Ліміт)
Демонстрація вимоги рівня «Добре»:

Bash
curl.exe "http://localhost:3000/api/users?sort=name&limit=5"
Створення нової заявки (POST)
Bash
curl.exe -X POST http://localhost:3000/api/access-requests -H "Content-Type: application/json" -d "{\"userId\": 2, \"resource\": \"Lab 404\"}"
Видалення користувача (DELETE / Повний CRUD)
Bash
curl.exe -X DELETE http://localhost:3000/api/users/1
Перевірка обробки помилок (404 Not Found)
Bash
curl.exe http://localhost:3000/api/users/999
4. Архітектура та особливості реалізації
Layered Architecture: Проект розділений на шари (Routes -> Controllers -> Services -> Repositories).

Централізована обробка помилок: Використовується Middleware в server.js, що повертає помилки у форматі JSON.

Seed Data: При порожній базі автоматично додається 5 тестових користувачів.

Обмеження: Згідно з вимогами лаби, ORM не використовується, запити виконуються через пряму конкатенацію (без плейсхолдерів для демонстрації архітектури).