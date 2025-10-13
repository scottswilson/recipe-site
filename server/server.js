


const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


updateRecipeImpl = (res, field, id, datum) => {
  const query = `UPDATE recipes SET ${field} = ? WHERE id = ?`;

  db.run(query, [datum, id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to update recipe' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe updated successfully' });
  });
};

validateImpl = (req) => {
  console.log("VALIDATE")
  const { key, id } = req.body;

  if (!key || !id) {
    return 'Missing fields';
  }

  if (key != SECRET) {
    return 'Invalid data';
  }
};

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value; // Return original value if parsing fails
  }
}

app.post('/api/v1/recipeName', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "name", id, name);

});

app.post('/api/v1/servings', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, servings } = req.body;
  if (!id || !servings) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "servings", id, servings);
});

app.post('/api/v1/ingredients', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, ingredients } = req.body;
  if (!id || !ingredients) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "ingredients", id, JSON.stringify(ingredients));
});

app.post('/api/v1/procedure', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, procedure } = req.body;
  if (!id || !procedure) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "procedure", id, JSON.stringify(procedure));
});

app.post('/api/v1/tags', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, tags } = req.body;
  if (!id || !tags) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "tags", id, JSON.stringify(tags));
});

app.post('/api/v1/image', (req, res) => {
  const error = validateImpl(req);
  if (error) {
    return res.status(400).json({ error });
  }

  const { id, image } = req.body;
  if (!id || !image) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  updateRecipeImpl(res, "image", id, image);
});

// POST a new user
app.post('/api/v1/newRecipe', (req, res) => {
  const {
    key,
    name,
    servings,
    ingredients,
    procedure,
    tags,
    image,
  } = req.body;

  if (key != SECRET) return res.status(400).json({ error: 'Invalid data' });

  const id = uuidv4(); // generate UUID
  const stmt = db.prepare(`
    INSERT INTO recipes (id, name, servings, ingredients, procedure, tags, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    name,
    servings,
    JSON.stringify(ingredients),
    JSON.stringify(procedure),
    JSON.stringify(tags),
    image,
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert recipe' });
      } else {
        res.status(201).json({ message: 'Recipe added', id });
      }
    }
  );

  stmt.finalize();
});

app.post('/api/v1/deleteRecipe', (req, res) => {
  console.log(`DELETE RECIPE ${req.body.id}`)
  const {
    key,
    id,
  } = req.body;

  if (key != SECRET) return res.status(400).json({ error: 'Invalid data' });

  const stmt = db.prepare('DELETE FROM recipes WHERE id = ?');

  stmt.run(
    id,
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete recipe' });
      } else {
        res.status(201).json({ message: 'Recipe deleted', id });
      }
    }
  );

  stmt.finalize();
});

app.get('/api/v1/recipes', (req, res) => {
  console.log("GET RECIPES")
  const sql = 'SELECT * FROM recipes';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Failed to fetch recipes:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const recipes = rows.map(row => ({
      id: row.id,
      name: row.name,
      servings: row.servings,
      ingredients: safeParse(row.ingredients),
      procedure: safeParse(row.procedure),
      tags: safeParse(row.tags),
      image: row.image
    }));

    res.status(201).json(recipes);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});