
import { Server as SocketIOServer, Socket } from 'socket.io';
import { CreateMatchUseCase } from '../usecases/match/CreateMatchUseCase.js';
import JoinMatchUseCase from '../usecases/match/JoinMatchUseCase.js';
import MakeMoveUseCase from '../usecases/match/MakeMoveUseCase.js';
import { PlayerConnectionUseCase } from '../usecases/player/PlayerConnectionUseCase.js';

export class WebSocketService {
  private io: SocketIOServer;

  constructor(
    io: SocketIOServer,
    private createMatchUseCase: CreateMatchUseCase,
    private joinMatchUseCase: JoinMatchUseCase,
    private makeMoveUseCase: MakeMoveUseCase,
    private playerConnectionUseCase: PlayerConnectionUseCase
  ) {
    this.io = io;
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`);

      socket.on('player:connect', async (data: { name?: string }) => {
        try {
          const player = await this.playerConnectionUseCase.connect(socket.id, data.name);
          socket.emit('player:connected', { player: player.getPublicProfile() });
        } catch (error) {
          socket.emit('error', { message: (error as Error).message });
        }
      });

      socket.on('match:create', async () => {
        try {
          const { match, playerSymbol } = await this.createMatchUseCase.execute(socket.id);
          socket.join(match._id);
          socket.emit('match:created', { 
            match: match.toJSON(), 
            playerSymbol,
            playerId: socket.id
          });
          
          socket.broadcast.emit('match:available', { matchId: match._id });
        } catch (error) {
          socket.emit('error', { message: (error as Error).message });
        }
      });

      socket.on('match:join', async (data: { matchId: string }) => {
        try {
          const { match, playerSymbol } = await this.joinMatchUseCase.execute(data.matchId, socket.id);
          socket.join(match._id);
          
          socket.emit('match:joined', { 
            match: match.toJSON(), 
            playerSymbol,
            playerId: socket.id
          });

          this.io.to(match._id).emit('match:updated', { match: match.toJSON() });
          
          if (match.players.X && match.players.O) {
            socket.broadcast.emit('match:unavailable', { matchId: match._id });
          }
        } catch (error) {
          socket.emit('error', { message: (error as Error).message });
        }
      });

      socket.on('match:move', async (data: { matchId: string; position: number }) => {
        try {
          const match = await this.makeMoveUseCase.execute(data.matchId, socket.id, data.position);
          
          this.io.to(match._id).emit('match:updated', { match: match.toJSON() });
          
          if (match.status === 'Finalizado') {
            this.io.to(match._id).emit('match:finished', { 
              match: match.toJSON(),
              winner: match.result,
              result: match.status
            });
          }
        } catch (error) {
          socket.emit('error', { message: (error as Error).message });
        }
      });

      socket.on('match:restart', async (data: { matchId: string }) => {
        try {
          const { match, playerSymbol } = await this.createMatchUseCase.execute(socket.id);
          
          socket.leave(data.matchId);

          socket.join(match._id);
          
          socket.emit('match:restarted', { 
            match: match.toJSON(), 
            playerSymbol,
            playerId: socket.id
          });
        } catch (error) {
          socket.emit('error', { message: (error as Error).message });
        }
      });

      socket.on('disconnect', async () => {
        console.log(`Player disconnected: ${socket.id}`);
        try {
          await this.playerConnectionUseCase.disconnect(socket.id);
        } catch (error) {
          console.error('Error handling disconnect:', error);
        }
      });
    });
  }
}
