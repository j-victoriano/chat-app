require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('socket.io');

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config')

const server = app.listen(8000, () => console.log('Listening on Port 8000'))

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);

    socket.on("event_from_client", data => {
        socket.broadcast.emit("event_to_all_other_clients", data);
    });
});

require('./config/mongoose.config');
require('./routes/user.routes')(app);
