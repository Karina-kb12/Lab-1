const fs = require('fs');
const path = require('path');
const { db } = require('./db');

function seedDatabase() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM Users", [], (err, row) => {
      if (err) return reject(err);

      if (row && row.count === 0) {
        console.log("База порожня. Додаю тестові дані (Seed)...");
        
        const stmt = db.prepare("INSERT INTO Users (name, email, role) VALUES (?, ?, ?)");
        
        stmt.run('Admin', 'admin@univ.kiev.ua', 'Admin');
        stmt.run('Karina', 'karina@univ.kiev.ua', 'Student');
        stmt.run('Student_Test', 'student@test.com', 'Student');
        stmt.run('Cyber_Security_Pro', 'pro@cyber.ua', 'Student');
        stmt.run('Guest_User', 'guest@example.com', 'Student');
        
        stmt.finalize((err) => {
            if (err) return reject(err);
            console.log("Тестові дані успішно додані.");
            resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

function initDb() {
  return new Promise((resolve, reject) => {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    db.exec(schema, async (err) => {
      if (err) {
        console.error("Помилка ініціалізації БД:", err.message);
        return reject(err);
      }
      
      console.log("Таблиці успішно створені або вже існують.");
      
      try {
        await seedDatabase();
        resolve();
      } catch (seedErr) {
        console.error("Помилка при заповненні даними:", seedErr.message);
        reject(seedErr);
      }
    });
  });
}

module.exports = { initDb };