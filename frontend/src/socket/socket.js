// Create a single socket instance to share across components
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', { transports: ['websocket'] });
