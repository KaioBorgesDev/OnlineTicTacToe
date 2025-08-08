import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { InMemoryPlayerRepository } from "./infra/repositories/InMemoryPlayerRepository.js";
import { InMemoryMatchRepository } from "./infra/repositories/InMemoryGameRepository.js";
import { CreateMatchUseCase } from "./infra/usecases/match/CreateMatchUseCase.js";
import JoinMatchUseCase from "./infra/usecases/match/JoinMatchUseCase.js";
import MakeMoveUseCase from "./infra/usecases/match/MakeMoveUseCase.js";
import { PlayerConnectionUseCase } from "./infra/usecases/player/PlayerConnectionUseCase.js";
import { WebSocketService } from "./infra/services/WebSocketService.js";

dotenv.config();

const port = Number(process.env.PORT) || 3001;

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://online-tic-tac-toe-virid.vercel.app/"],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000"
}));

app.get("/", (req: any, res: any) => {
  res.send("TicTacToe Server is running!");
});

const playerRepository = new InMemoryPlayerRepository();
const matchRepository = new InMemoryMatchRepository(); 
const createMachUseCase = new CreateMatchUseCase(matchRepository, playerRepository);
const joinMatchUseCase = new JoinMatchUseCase(matchRepository, playerRepository);
const makeMoveUseCase = new MakeMoveUseCase(matchRepository, playerRepository);
const playerConnectionUseCase = new PlayerConnectionUseCase(playerRepository, matchRepository);

new WebSocketService(io, createMachUseCase, joinMatchUseCase, makeMoveUseCase, playerConnectionUseCase);

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`We are running on port ${port}`);
});