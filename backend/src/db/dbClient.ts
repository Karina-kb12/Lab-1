import { db } from './db';

db.run("PRAGMA foreign_keys = ON;");

export function all(sql: string, params: any = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

export function get(sql: string, params: any = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });
}

export function run(sql: string, params: any = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: any, err: Error | null) {
      if (err) return reject(err);
      resolve({ id: this.lastID, lastID: this.lastID, changes: this.changes });
    });
  });
}