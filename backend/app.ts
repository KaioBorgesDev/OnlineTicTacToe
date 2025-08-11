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

const port = Number(process.env.PORT) || 8080;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const allowedOrigins = [
  "http://localhost:3000", 
  "https://online-tic-tac-toe-virid.vercel.app",
  frontendUrl
].filter(Boolean);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware de logging
app.use((req: any, res: any, next: any) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware para parsing JSON
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.json({ 
    message: "TicTacToe Server is running!",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req: any, res: any) => {
  res.json({ 
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const playerRepository = new InMemoryPlayerRepository();
const matchRepository = new InMemoryMatchRepository(); 
const createMachUseCase = new CreateMatchUseCase(matchRepository, playerRepository);
const joinMatchUseCase = new JoinMatchUseCase(matchRepository, playerRepository);
const makeMoveUseCase = new MakeMoveUseCase(matchRepository, playerRepository);
const playerConnectionUseCase = new PlayerConnectionUseCase(playerRepository, matchRepository);

new WebSocketService(io, createMachUseCase, joinMatchUseCase, makeMoveUseCase, playerConnectionUseCase);

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`🚀 TicTacToe Server is running on port ${port}`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
});