CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT UNIQUE,
    password TEXT
);

CREATE TABLE IF NOT EXISTS recipes (
    id UUID NOT NULL,
    name TEXT,
    servings INT,
    ingredients TEXT,
    procedure TEXT,
    tags TEXT,
    image TEXT
);