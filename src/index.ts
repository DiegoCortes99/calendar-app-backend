import express, { Request, Response } from 'express'
require('dotenv').config();

console.log(process.env);

const app = express()

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
//     res.send('<h1>Hola mundo</h1>')
// })

app.use(express.static('public'))

app.listen(process.env.PORT, () => {
    console.log(`Corriendo en el puerto ${process.env.PORT}`)
})