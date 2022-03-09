import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000', {
  auth: { token: window.localStorage.token }
});

socket.on("connect", () => {
    console.log(socket.id);
  });

export default socket;