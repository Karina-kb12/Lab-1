CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK(role IN ('Student', 'Admin')) NOT NULL
);

CREATE TABLE IF NOT EXISTS AccessRequests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    access_type TEXT NOT NULL,
    comments TEXT,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected')),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Approvals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL,
    admin_id INTEGER NOT NULL,
    decision_date TEXT NOT NULL,
    FOREIGN KEY (request_id) REFERENCES AccessRequests(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO schema_migrations (version) VALUES ('001_initial_schema');

CREATE INDEX IF NOT EXISTS idx_users_name ON Users(name);

CREATE INDEX IF NOT EXISTS idx_requests_user ON AccessRequests(user_id);