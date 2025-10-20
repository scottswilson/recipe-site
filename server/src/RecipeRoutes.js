
const db = require('../db');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const MAX_SIZE = 10000;
const MAX_IMAGE_SIZE = 20000;

updateRecipeImpl = (res, field, id, ownerId, datum) => {
  const query = `UPDATE recipes SET ${field} = ? WHERE (id = ? AND ownerId = ?)`;

  db.run(query, [datum, id, ownerId], function (err) {
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
  if (!req.body.id) {
    return 'Missing fields';
  }
};

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value; // Return original value if parsing fails
  }
}

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

module.exports = app => {
  app.post('/api/v1/recipeName', isAuthenticated, (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (name.length > MAX_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }

    updateRecipeImpl(res, "name", id, req.session.userId, name);

  });

  app.post('/api/v1/servings', isAuthenticated, (req, res) => {
    const { id, servings } = req.body;
    if (!id || !servings) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (servings > MAX_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }
    
    updateRecipeImpl(res, "servings", id, req.session.userId, servings);
  });

  app.post('/api/v1/ingredients', isAuthenticated, (req, res) => {
    const { id, ingredients } = req.body;
    if (!id || !ingredients) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (JSON.stringify(ingredients).length > MAX_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }

    updateRecipeImpl(res, "ingredients", id, req.session.userId, JSON.stringify(ingredients));
  });

  app.post('/api/v1/procedure', isAuthenticated, (req, res) => {
    const { id, procedure } = req.body;
    if (!id || !procedure) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (JSON.stringify(procedure).length > MAX_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }

    updateRecipeImpl(res, "procedure", id, req.session.userId, JSON.stringify(procedure));
  });

  app.post('/api/v1/tags', isAuthenticated, (req, res) => {
    const { id, tags } = req.body;
    if (!id || !tags) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (JSON.stringify(tags).length > MAX_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }

    updateRecipeImpl(res, "tags", id, req.session.userId, JSON.stringify(tags));
  });

  app.post('/api/v1/image', isAuthenticated, (req, res) => {
    const { id, image } = req.body;
    if (!id || !image) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (image.length > MAX_IMAGE_SIZE) {
      return res.status(400).json({ error: 'Too big' });
    }

    updateRecipeImpl(res, "image", id, req.session.userId, image);
  });

  // POST a new user
  app.post('/api/v1/newRecipe', isAuthenticated, (req, res) => {
    const {
      name,
      servings,
      ingredients,
      procedure,
      tags,
      image,
    } = req.body;

    const id = uuidv4(); // generate UUID
    const stmt = db.prepare(`
      INSERT INTO recipes (id, name, servings, ingredients, procedure, tags, image, ownerId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name,
      servings,
      JSON.stringify(ingredients),
      JSON.stringify(procedure),
      JSON.stringify(tags),
      image,
      req.session.userId,
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

  app.post('/api/v1/deleteRecipe', isAuthenticated, (req, res) => {
    const stmt = db.prepare('DELETE FROM recipes WHERE (id = ? AND ownerId = ?)');

    stmt.run(
      req.body.id,
      req.session.userId,
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to delete recipe' });
        } else {
          res.status(201).json({ message: 'Recipe deleted', id: req.body.id });
        }
      }
    );

    stmt.finalize();
  });

  app.get('/api/v1/recipes', isAuthenticated, (req, res) => {
    const sql = 'SELECT * FROM recipes WHERE (ownerId = ?)';

    db.all(sql, [
      req.session.userId,
    ], (err, rows) => {
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

}
