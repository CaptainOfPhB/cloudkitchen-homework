import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('connect', function onConnect() {
  console.log('Client socket connected!');
});

socket.on('disconnect', function onConnect() {
  console.log('Client socket disconnected!');
});

export default function <T>(eventName: string, handleEvent: (data: T) => void) {
  socket.on(eventName, handleEvent);
}

