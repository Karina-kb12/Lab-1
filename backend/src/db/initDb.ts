import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { db } from './db';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

function seedDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM Users", [], (err, row: any) => {
      if (err) return reject(err);

      if (row && row.count === 0) {
        console.log("База порожня. Додаю користувачів...");
        const stmt = db.prepare("INSERT INTO Users (name, email, password_hash, password_salt, role) VALUES (?, ?, ?, ?, ?)");
        
        const saltAdmin = generateSalt();
        const hashAdmin = hashPassword('admin123', saltAdmin);
        stmt.run('Admin', 'admin@univ.kiev.ua', hashAdmin, saltAdmin, 'Admin');

        const saltKarina = generateSalt();
        const hashKarina = hashPassword('password123', saltKarina);
        stmt.run('Karina', 'karina@univ.kiev.ua', hashKarina, saltKarina, 'Student');

        const saltTest = generateSalt();
        const hashTest = hashPassword('test1234', saltTest);
        stmt.run('Student_Test', 'student@test.com', hashTest, saltTest, 'Student');

        stmt.finalize();
      }

      db.get("SELECT COUNT(*) as count FROM AccessRequests", [], (err, row: any) => {
        if (err) return reject(err);

        if (row && row.count === 0) {
          console.log("Додаю тестові заявки для фронтенду...");
          const stmt = db.prepare(`
            INSERT INTO AccessRequests (user_id, user_name, date, access_type, comments, status) 
            VALUES (?, ?, ?, ?, ?, ?)
          `);

          const now = new Date().toISOString();
          
          stmt.run(2, 'Karina', now, 'Тимчасовий', 'Потрібно доробити лабу №4', 'Pending');
          stmt.run(3, 'Student_Test', now, 'Постійний', 'Доступ до спеціалізованого ПЗ', 'Approved');
          stmt.run(2, 'Karina', now, 'Тимчасовий', 'Робота в лабораторії кібербезпеки', 'Pending');

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
  });
}

export function initDb(): Promise<void> {
  return new Promise((resolve, reject) => {
    const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
        return reject(new Error(`Файл схеми не знайдено за шляхом: ${schemaPath}`));
    }

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
      } catch (seedErr: any) {
        console.error("Помилка при заповненні даними:", seedErr.message);
        reject(seedErr);
      }
    });
  });
}