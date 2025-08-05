import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketService } from "infra/services/WebSocketService";
import { CreateMatchUseCase } from "infra/usecases/match/CreateMatchUseCase";
import { InMemoryPlayerRepository } from "infra/repositories/InMemoryPlayerRepository";
import { InMemoryMatchRepository } from "infra/repositories/InMemoryGameRepository";
import JoinMatchUseCase from "infra/usecases/match/JoinMatchUseCase";
import MakeMoveUseCase from "infra/usecases/match/MakeMoveUseCase";
import { PlayerConnectionUseCase } from "infra/usecases/player/PlayerConnectionUseCase";
dotenv.config();

const port = process.env.PORT || 3001;

const server = express();

server.use(cors({
  origin: "http://localhost:3000"
}));

const playerRepository = new InMemoryPlayerRepository();
const matchRepository = new InMemoryMatchRepository(); 
const createMachUseCase = new CreateMatchUseCase(matchRepository, playerRepository);
const joinMatchUseCase = new JoinMatchUseCase(matchRepository, playerRepository);
const makeMoveUseCase = new MakeMoveUseCase(matchRepository, playerRepository);
const playerConnectionUseCase = new PlayerConnectionUseCase(playerRepository, matchRepository);

new WebSocketService(server, createMachUseCase, joinMatchUseCase, makeMoveUseCase, playerConnectionUseCase);


server.listen(port, '0.0.0.0', ()=> {
    console.log(`We are running on port ${port}`);
});