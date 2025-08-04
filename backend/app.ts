import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 3001;

const server = express();

server.use(cors({
  origin: "http://localhost:3000"
}));

server.get("/", (req, res) => {
    res.send("Hello World!");
});

server.listen(port, '0.0.0.0', ()=> {
    console.log(`We are running on port ${port}`);
});