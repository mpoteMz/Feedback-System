const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const cors = require('cors')
const allowedOrigins = ['http://localhost:3001'];

// Enable CORS for specific origins
app.use(cors({
    origin: function (origin, callback) {
        // Check if the request origin is allowed
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

// Socket.io connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('submitFeedback', (data) => {
        console.log('Received feedback from:', data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.use(bodyParser.json());
app.use(require('./app/routes'))


app.use(cors()); // Use the cors middleware
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// app.use(cors({
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

const initMongo = require('./config/mongo')
initMongo()