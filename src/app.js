import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
    try {
      const result = await connection.query("SELECT * FROM items");
  
      res.send(result.rows);
    } catch (erro) {
      console.log(erro);
      res.sendStatus(500);
    }
  });

  app.post("/items", async (req, res) => {
    try {
      const { text } = req.body;
  
      if (!text) {
        return res.sendStatus(400);
      }
  
      const result = await connection.query("INSERT INTO items (text) VALUES ($1)",[text]);
  
      res.sendStatus(201);
    } catch (erro) {
      console.log(erro);
      res.sendStatus(500);
    }
  });


export default app;
