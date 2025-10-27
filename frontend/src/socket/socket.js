// Create a single socket instance to share across components
//Recently added for Socket.IO integration
//Might get modified later as integration improves
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', { transports: ['websocket'] });
