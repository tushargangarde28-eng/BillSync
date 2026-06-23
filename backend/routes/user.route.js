const express = require('express');
const sql = require('../database/db');

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  try {
    const result = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${password})
      RETURNING id;
    `;

    res.status(201).json({
      message: "User registered successfully",
      userId: result[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }
  try {
    const result = await sql`
      SELECT * FROM users WHERE username = ${username} AND password = ${password};
    `;
    if (result.length === 0) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    res.status(200).json({
      message: "Login successful",
      userId: result[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const result = await sql`
      SELECT * FROM categories;
    `;
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.post("/add-category", async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }
  try {
    const result = await sql`
      INSERT INTO categories (name, description)
      VALUES (${name}, ${description})
      RETURNING id;
    `;
    res.status(201).json({
      message: "Category added successfully",
      categoryId: result[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.post("edit-category/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  } 
  try {
    const result = await sql`
      UPDATE categories
      SET name = ${name}, description = ${description}  
    WHERE id = ${id}
      RETURNING id;
    `;
    if (result.length === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    res.status(200).json({
      message: "Category updated successfully",
      categoryId: result[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.post("delete-category/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`
      DELETE FROM categories WHERE id = ${id} RETURNING id;
    `;
    if (result.length === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    } 
    res.status(200).json({
      message: "Category deleted successfully",
      categoryId: result[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});


// CREATE TABLE categories (

//     id SERIAL PRIMARY KEY,

//     name VARCHAR(100) NOT NULL UNIQUE,

//     description TEXT,

//     status BOOLEAN DEFAULT TRUE,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

// );





module.exports = router;