import express from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { dbConnection } from './database/config';
import cors from 'cors';

dotenv.config();
// console.log(process.env);

// Crea el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', authRouter);

// Escuchar peticiones

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
});