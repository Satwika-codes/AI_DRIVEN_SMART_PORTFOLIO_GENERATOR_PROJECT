// // server.js

// console.log("🚀 THIS SERVER FILE IS RUNNING");

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
// const Groq = require("groq-sdk");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // =============================
// // GROQ AI SETUP
// // =============================
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// // =============================
// // DATABASE SETUP
// // =============================
// const db = new sqlite3.Database(
//   path.join(__dirname, "database.db"),
//   (err) => {
//     if (err) {
//       console.error("Database connection error:", err.message);
//     } else {
//       console.log("Connected to SQLite database ✅");
//     }
//   }
// );

// // =============================
// // CREATE TABLES (UPDATED)
// // =============================
// db.run(`
// CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT,
//   email TEXT UNIQUE,
//   password TEXT
// )
// `);

// db.run(`
// CREATE TABLE IF NOT EXISTS portfolios (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER,
//   name TEXT,
//   title TEXT,
//   sections TEXT   -- 🔥 IMPORTANT CHANGE
// )
// `);

// // =============================
// // TEST ROUTE
// // =============================
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// // =============================
// // REGISTER API
// // =============================
// app.post("/api/register", (req, res) => {

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

//   db.run(sql, [name, email, password], function (err) {

//     if (err) {
//       return res.status(500).json({ message: "User already exists" });
//     }

//     res.json({
//       message: "User registered successfully",
//       userId: this.lastID
//     });

//   });

// });

// // =============================
// // LOGIN API
// // =============================
// app.post("/api/login", (req, res) => {

//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email=? AND password=?";

//   db.get(sql, [email, password], (err, row) => {

//     if (err) {
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (!row) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       message: "Login successful",
//       user: row
//     });

//   });

// });

// // =============================
// // AI CHATBOT API
// // =============================
// app.post("/api/ai", async (req, res) => {

//   try {

//     const { prompt } = req.body;

//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.1-8b-instant"
//     });

//     const reply = completion.choices[0].message.content;

//     res.json({ reply });

//   } catch (error) {

//     console.error("AI ERROR:", error);

//     res.status(500).json({
//       reply: "AI service error"
//     });

//   }

// });

// // =============================
// // SAVE / UPDATE PORTFOLIO (DYNAMIC)
// // =============================
// app.post("/api/save-portfolio", (req, res) => {

//   const { user_id, name, title, sections } = req.body;

//   const sectionsString = JSON.stringify(sections);

//   const checkSql = "SELECT * FROM portfolios WHERE user_id=?";

//   db.get(checkSql, [user_id], (err, row) => {

//     if (err) {
//       return res.status(500).json({ message: "Database error" });
//     }

//     // 🔄 UPDATE
//     if (row) {

//       const updateSql = `
//         UPDATE portfolios
//         SET name=?, title=?, sections=?
//         WHERE user_id=?
//       `;

//       db.run(updateSql,
//         [name, title, sectionsString, user_id],
//         function (err) {

//           if (err) {
//             return res.status(500).json({ message: "Update failed" });
//           }

//           return res.json({
//             message: "Portfolio updated ✅",
//             portfolioId: row.id
//           });

//         });

//     }

//     // 🆕 CREATE
//     else {

//       const insertSql = `
//         INSERT INTO portfolios (user_id,name,title,sections)
//         VALUES (?,?,?,?)
//       `;

//       db.run(insertSql,
//         [user_id, name, title, sectionsString],
//         function (err) {

//           if (err) {
//             return res.status(500).json({ message: "Insert failed" });
//           }

//           return res.json({
//             message: "Portfolio created ✅",
//             portfolioId: this.lastID
//           });

//         });

//     }

//   });

// });

// // =============================
// // GET PORTFOLIO
// // =============================
// app.get("/api/portfolio/:id", (req, res) => {

//   const id = req.params.id;

//   db.get("SELECT * FROM portfolios WHERE id=?", [id], (err, row) => {

//     if (err) {
//       return res.status(500).json({ message: "Error fetching portfolio" });
//     }

//     if (!row) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     res.json(row);

//   });

// });

// // =============================
// // START SERVER
// // =============================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// // server.js

// console.log("🚀 THIS SERVER FILE IS RUNNING");

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
// const Groq = require("groq-sdk");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // =============================
// // GROQ
// // =============================
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// // =============================
// // DB
// // =============================
// const db = new sqlite3.Database(
//   path.join(__dirname, "database.db"),
//   (err) => {
//     if (err) console.error(err);
//     else console.log("Connected to DB ✅");
//   }
// );

// // =============================
// // TABLES
// // =============================
// db.run(`
// CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT,
//   email TEXT UNIQUE,
//   password TEXT
// )
// `);

// db.run(`
// CREATE TABLE IF NOT EXISTS portfolios (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER,
//   sections TEXT,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// )
// `);

// // =============================
// // REGISTER
// // =============================
// app.post("/api/register", (req, res) => {

//   const { name, email, password } = req.body;

//   db.run(
//     "INSERT INTO users (name,email,password) VALUES (?,?,?)",
//     [name, email, password],
//     function (err) {

//       if (err) return res.status(500).json({ message: "User exists" });

//       res.json({ userId: this.lastID });
//     }
//   );
// });

// // =============================
// // LOGIN
// // =============================
// app.post("/api/login", (req, res) => {

//   const { email, password } = req.body;

//   db.get(
//     "SELECT * FROM users WHERE email=? AND password=?",
//     [email, password],
//     (err, row) => {

//       if (!row) return res.status(401).json({ message: "Invalid" });

//       res.json({ user: row });
//     }
//   );
// });

// // =============================
// // AI
// // =============================
// app.post("/api/ai", async (req, res) => {

//   try {
//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: req.body.prompt }],
//       model: "llama-3.1-8b-instant"
//     });

//     res.json({ reply: completion.choices[0].message.content });

//   } catch {
//     res.status(500).json({ reply: "AI error" });
//   }
// });

// // =============================
// // SAVE / UPDATE (🔥 FIXED)
// // =============================
// app.post("/api/save-portfolio", (req, res) => {

//   const { user_id, sections, portfolioId } = req.body;

//   const sectionsString = JSON.stringify(sections);

//   // 🔥 UPDATE EXISTING
//   if (portfolioId) {

//     db.run(
//       "UPDATE portfolios SET sections=? WHERE id=?",
//       [sectionsString, portfolioId],
//       function (err) {

//         if (err) return res.status(500).json({ message: "Update failed" });

//         return res.json({
//           message: "Updated ✅",
//           portfolioId
//         });
//       }
//     );

//   }

//   // 🆕 CREATE NEW
//   else {

//     db.run(
//       "INSERT INTO portfolios (user_id, sections) VALUES (?,?)",
//       [user_id, sectionsString],
//       function (err) {

//         if (err) return res.status(500).json({ message: "Insert failed" });

//         res.json({
//           message: "Created ✅",
//           portfolioId: this.lastID
//         });
//       }
//     );

//   }

// });

// // =============================
// // GET SINGLE
// // =============================
// app.get("/api/portfolio/:id", (req, res) => {

//   db.get(
//     "SELECT * FROM portfolios WHERE id=?",
//     [req.params.id],
//     (err, row) => {

//       if (!row) return res.status(404).json({});

//       res.json(row);
//     }
//   );
// });

// // =============================
// // GET USER PORTFOLIOS
// // =============================
// app.get("/api/user-portfolios/:userId", (req, res) => {

//   db.all(
//     "SELECT * FROM portfolios WHERE user_id=? ORDER BY id DESC",
//     [req.params.userId],
//     (err, rows) => {

//       if (err) return res.json([]);

//       res.json(rows);
//     }
//   );
// });

// // =============================
// // DELETE
// // =============================
// app.delete("/api/delete-portfolio/:id", (req, res) => {

//   db.run(
//     "DELETE FROM portfolios WHERE id=?",
//     [req.params.id],
//     function (err) {

//       if (err) return res.status(500).json({});

//       res.json({ message: "Deleted ✅" });
//     }
//   );
// });

// // =============================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// // server.js

// console.log("🚀 THIS SERVER FILE IS RUNNING");

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
// const Groq = require("groq-sdk");
// const bcrypt = require("bcrypt");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // =============================
// // GROQ
// // =============================
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// // =============================
// // DB
// // =============================
// const db = new sqlite3.Database(
//   path.join(__dirname, "database.db"),
//   (err) => {
//     if (err) console.error(err);
//     else console.log("Connected to DB ✅");
//   }
// );

// // =============================
// // TABLES
// // =============================
// db.run(`
// CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT,
//   email TEXT UNIQUE,
//   password TEXT
// )
// `);

// db.run(`
// CREATE TABLE IF NOT EXISTS portfolios (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER,
//   sections TEXT,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// )
// `);

// // =============================
// // REGISTER
// // =============================
// app.post("/api/register", async (req, res) => {

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     db.run(
//       "INSERT INTO users (name,email,password) VALUES (?,?,?)",
//       [name, email, hashedPassword],
//       function (err) {

//         if (err) {
//           if (err.message.includes("UNIQUE")) {
//             return res.status(400).json({ message: "User already exists" });
//           }
//           return res.status(500).json({ message: "Server error" });
//         }

//         res.json({ userId: this.lastID });
//       }
//     );

//   } catch (err) {
//     res.status(500).json({ message: "Error hashing password" });
//   }
// });

// // =============================
// // LOGIN
// // =============================
// app.post("/api/login", (req, res) => {

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   db.get(
//     "SELECT * FROM users WHERE email=?",
//     [email],
//     async (err, row) => {

//       if (err) {
//         return res.status(500).json({ message: "Server error" });
//       }

//       if (!row) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       const valid = await bcrypt.compare(password, row.password);

//       if (!valid) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       res.json({ user: row });
//     }
//   );
// });

// // =============================
// // AI
// // =============================
// app.post("/api/ai", async (req, res) => {

//   try {
//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: req.body.prompt }],
//       model: "llama-3.1-8b-instant"
//     });

//     res.json({ reply: completion.choices[0].message.content });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ reply: "AI error" });
//   }
// });

// // =============================
// // SAVE / UPDATE (FINAL FIX)
// // =============================
// app.post("/api/save-portfolio", (req, res) => {

//   const { user_id, sections, portfolioId } = req.body;

//   if (!user_id || !sections) {
//     return res.status(400).json({ message: "Missing data" });
//   }

//   const sectionsString = JSON.stringify(sections);

//   // =============================
//   // 🔥 UPDATE EXISTING
//   // =============================
//   if (portfolioId) {

//     return db.run(
//       "UPDATE portfolios SET sections=? WHERE id=? AND user_id=?",
//       [sectionsString, portfolioId, user_id],
//       function (err) {

//         if (err) {
//           console.log(err);
//           return res.status(500).json({ message: "Update failed" });
//         }

//         if (this.changes === 0) {
//           return res.status(403).json({ message: "Unauthorized or not found" });
//         }

//         return res.json({
//           message: "Portfolio updated ✅",
//           portfolioId: portfolioId
//         });
//       }
//     );

//   }

//   // =============================
//   // 🆕 CREATE NEW
//   // =============================
//   else {

//     db.run(
//       "INSERT INTO portfolios (user_id, sections) VALUES (?,?)",
//       [user_id, sectionsString],
//       function (err) {

//         if (err) {
//           console.log(err);
//           return res.status(500).json({ message: "Insert failed" });
//         }

//         return res.json({
//           message: "Portfolio created ✅",
//           portfolioId: this.lastID
//         });
//       }
//     );

//   }

// });

// // =============================
// // GET SINGLE PORTFOLIO
// // =============================
// app.get("/api/portfolio/:id", (req, res) => {

//   db.get(
//     "SELECT * FROM portfolios WHERE id=?",
//     [req.params.id],
//     (err, row) => {

//       if (err) {
//         console.log(err);
//         return res.status(500).json({});
//       }

//       if (!row) return res.status(404).json({});

//       try {
//         row.sections = row.sections ? JSON.parse(row.sections) : [];
//       } catch {
//         row.sections = [];
//       }

//       res.json(row);
//     }
//   );
// });

// // =============================
// // GET USER PORTFOLIOS
// // =============================
// app.get("/api/user-portfolios/:userId", (req, res) => {

//   db.all(
//     "SELECT * FROM portfolios WHERE user_id=? ORDER BY id DESC",
//     [req.params.userId],
//     (err, rows) => {

//       if (err) {
//         console.log(err);
//         return res.json([]);
//       }

//       const parsedRows = rows.map(r => ({
//         ...r,
//         sections: r.sections ? JSON.parse(r.sections) : []
//       }));

//       res.json(parsedRows);
//     }
//   );
// });

// // =============================
// // DELETE PORTFOLIO
// // =============================
// app.delete("/api/delete-portfolio/:id", (req, res) => {

//   db.run(
//     "DELETE FROM portfolios WHERE id=?",
//     [req.params.id],
//     function (err) {

//       if (err) {
//         console.log(err);
//         return res.status(500).json({});
//       }

//       res.json({ message: "Deleted ✅" });
//     }
//   );
// });

// // =============================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// server.js

console.log("🚀 THIS SERVER FILE IS RUNNING");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const Groq = require("groq-sdk");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// =============================
// GROQ
// =============================
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// =============================
// DB
// =============================
const db = new sqlite3.Database(
  path.join(__dirname, "database.db"),
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to DB ✅");
  }
);

// =============================
// TABLES
// =============================
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS portfolios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  sections TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// =============================
// REGISTER (PLAIN TEXT)
// =============================
app.post("/api/register", (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.run(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, password],
    function (err) {

      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: "Server error" });
      }

      res.json({ userId: this.lastID });
    }
  );
});

// =============================
// LOGIN (PLAIN TEXT MATCH)
// =============================
app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, row) => {

      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!row) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: row });
    }
  );
});

// =============================
// AI
// =============================
app.post("/api/ai", async (req, res) => {

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: req.body.prompt }],
      model: "llama-3.1-8b-instant"
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.log(err);
    res.status(500).json({ reply: "AI error" });
  }
});

// =============================
// SAVE / UPDATE
// =============================
app.post("/api/save-portfolio", (req, res) => {

  const { user_id, sections, portfolioId } = req.body;

  if (!user_id || !sections) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sectionsString = JSON.stringify(sections);

  // UPDATE
  if (portfolioId) {

    return db.run(
      "UPDATE portfolios SET sections=? WHERE id=? AND user_id=?",
      [sectionsString, portfolioId, user_id],
      function (err) {

        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Update failed" });
        }

        if (this.changes === 0) {
          return res.status(403).json({ message: "Not found" });
        }

        return res.json({
          message: "Portfolio updated ✅",
          portfolioId
        });
      }
    );

  }

  // CREATE
  else {

    db.run(
      "INSERT INTO portfolios (user_id, sections) VALUES (?,?)",
      [user_id, sectionsString],
      function (err) {

        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Insert failed" });
        }

        return res.json({
          message: "Portfolio created ✅",
          portfolioId: this.lastID
        });
      }
    );

  }

});

// =============================
// GET SINGLE
// =============================
app.get("/api/portfolio/:id", (req, res) => {

  db.get(
    "SELECT * FROM portfolios WHERE id=?",
    [req.params.id],
    (err, row) => {

      if (err) return res.status(500).json({});
      if (!row) return res.status(404).json({});

      row.sections = row.sections ? JSON.parse(row.sections) : [];

      res.json(row);
    }
  );
});

// =============================
// GET USER PORTFOLIOS
// =============================
app.get("/api/user-portfolios/:userId", (req, res) => {

  db.all(
    "SELECT * FROM portfolios WHERE user_id=? ORDER BY id DESC",
    [req.params.userId],
    (err, rows) => {

      if (err) return res.json([]);

      const parsed = rows.map(r => ({
        ...r,
        sections: r.sections ? JSON.parse(r.sections) : []
      }));

      res.json(parsed);
    }
  );
});

// =============================
// DELETE
// =============================
app.delete("/api/delete-portfolio/:id", (req, res) => {

  db.run(
    "DELETE FROM portfolios WHERE id=?",
    [req.params.id],
    function (err) {

      if (err) return res.status(500).json({});

      res.json({ message: "Deleted ✅" });
    }
  );
});

// =============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});