import express from 'express';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import NotesRoutes from './routes/notes.routes.js';
import cors from 'cors';

const app = express();

// middlewares
app.use(cookieParser())
app.use(express.json());

const corsOption = {
    origin: "http://localhost:5173",
    credential: true
}

app.use(cors(corsOption));

app.use(bodyParser.json({
    limit: '10mb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use('/api/v1/notes', NotesRoutes)
export default app;