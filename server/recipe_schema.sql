CREATE TABLE IF NOT EXISTS recipes (
    id UUID NOT NULL,
    name TEXT,
    servings INT,
    ingredients TEXT,
    procedure TEXT,
    tags TEXT,
    image TEXT
);