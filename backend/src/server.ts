import express from "express";
import "./database/connection";

const app = express();

app.get("/", (request, response) => {
  response.json({ ok: true });
});

app.listen(3333, () => console.log("app is running"));
