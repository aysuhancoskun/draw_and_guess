const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const User = require('./models/User');
const Session = require('./models/Session');

// MongoDB veritabanı bağlantısı
mongoose.connect('mongodb://localhost/draw_and_guess')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let currentSession = null;

const rasterizeDrawing = (drawingData) => {
    const pixelSize = 10;
    return {
        x: Math.floor(drawingData.x / pixelSize) * pixelSize,
        y: Math.floor(drawingData.y / pixelSize) * pixelSize,
        drawing: drawingData.drawing
    };
};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Yeni oturum oluşturma
    socket.on('newSession', async ({ username, correctAnswer }) => {
        console.log('newSession event received');
        // Kullanıcıyı bul veya oluştur
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username });
            await user.save();
        }

        if (!currentSession) {
            const newSession = new Session({
                creator: user._id,
                players: [user._id],
                currentDrawer: user._id,
                correctAnswer
            });

            await newSession.save();
            currentSession = newSession;
            socket.join(newSession.id);
            console.log(`New session created with ID: ${newSession.id}`);
            socket.emit('sessionCreated', { sessionId: newSession.id, userId: user._id });
        } else {
            console.log('A session is already active.');
            socket.emit('error', 'A session is already active.');
        }
    });

    // Mevcut oturuma katılma
    socket.on('joinSession', async ({ username, gameCode }) => {
        console.log('joinSession event received', { username, gameCode });
        if (!currentSession || currentSession.id !== gameCode) {
            console.log('No active session to join or invalid game code');
            socket.emit('error', 'No active session to join or invalid game code.');
            return;
        }

        // Kullanıcıyı bul veya oluştur
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username });
            await user.save();
        }

        currentSession.players.push(user._id);
        await currentSession.save();
        socket.join(currentSession.id);
        console.log(`User ${username} joined session with ID: ${currentSession.id}`);
        socket.emit('joinedSession', { sessionId: currentSession.id, userId: user._id });
        io.to(currentSession.id).emit('playerJoined', { username, userId: user._id });
        updateLeaderboard();
    });

    // Çizim alıp yayınlama
    socket.on('drawing', (data) => {
        const { sessionId, drawingData } = data;
        io.to(sessionId).emit('drawing', drawingData);
        const pixelatedData = rasterizeDrawing(drawingData);
        socket.broadcast.to(sessionId).emit('pixelatedDrawing', pixelatedData);
    });

    // Tahmin alıp kontrol etme ve puanlama
    socket.on('guess', async ({ sessionId, userId, guess }) => {
        console.log('guess event received');
        const session = await Session.findById(sessionId).populate('currentDrawer');
        if (session.correctAnswer.toLowerCase() === guess.toLowerCase()) {
            const user = await User.findById(userId);
            user.score += 10;
            await user.save();
            socket.emit('guessResult', { correct: true, score: user.score });
            io.to(sessionId).emit('newRound', { correctAnswer: session.correctAnswer, drawer: user.username, nextDrawerId: userId });
            updateLeaderboard();
        } else {
            socket.emit('guessResult', { correct: false });
        }
    });

    socket.on('newCorrectAnswer', async ({ sessionId, correctAnswer }) => {
        console.log('newCorrectAnswer event received');
        const session = await Session.findById(sessionId);
        session.correctAnswer = correctAnswer;
        await session.save();
    });

    socket.on('timeUp', async ({ sessionId }) => {
        console.log('timeUp event received');
        const session = await Session.findById(sessionId).populate('currentDrawer');
        const nextDrawerIndex = (session.players.indexOf(session.currentDrawer._id) + 1) % session.players.length;
        const nextDrawerId = session.players[nextDrawerIndex];
        session.currentDrawer = nextDrawerId;
        await session.save();
        const nextDrawer = await User.findById(nextDrawerId);
        io.to(sessionId).emit('newRound', { correctAnswer: session.correctAnswer, drawer: nextDrawer.username, nextDrawerId });
    });

    socket.on('updateLeaderboard', async ({ sessionId, userId, score }) => {
        console.log('updateLeaderboard event received');
        const users = await User.find({ _id: { $in: currentSession.players } });
        const leaderboard = users.map(user => ({
            username: user.username,
            score: user.score
        }));
        io.to(sessionId).emit('updateLeaderboard', leaderboard);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const updateLeaderboard = async () => {
    if (currentSession) {
        const users = await User.find({ _id: { $in: currentSession.players } });
        const leaderboard = users.map(user => ({
            username: user.username,
            score: user.score
        }));
        io.to(currentSession.id).emit('updateLeaderboard', leaderboard);
    }
};

// Farklı bir port numarası kullanarak sunucuyu başlatma
const PORT = process.env.PORT || 4001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
