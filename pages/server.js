const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configurar CORS específicamente para Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost",  // Permite solicitudes desde localhost
        methods: ["GET", "POST"],
    }
});

const players = {}; // Guardar información de los jugadores

io.on('connection', (socket) => {
    console.log(`Jugador conectado: ${socket.id}`);

    // Agregar nuevo jugador
    players[socket.id] = {
        id: socket.id,
        points: 0,  // Puntos del jugador
        hammerPosition: { x: 0, y: 0, z: 0 }, // Posición inicial
    };

    // Enviar la lista de jugadores al nuevo jugador
    socket.emit('currentPlayers', players);

    // Avisar a otros jugadores del nuevo jugador
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // Manejador para actualizar puntos
    socket.on('hitTopo', () => {
        players[socket.id].points += 1;
        io.emit('updatePoints', players); // Enviar puntos actualizados a todos
    });

    // Actualizar posición del martillo
    socket.on('updateHammer', (position) => {
        players[socket.id].hammerPosition = position;
        socket.broadcast.emit('updateHammerPosition', { id: socket.id, position });
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log(`Jugador desconectado: ${socket.id}`);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
