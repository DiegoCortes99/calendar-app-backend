import { Schema, model, connect } from 'mongoose';

export const dbConnection = async() =>{

    try {
        await connect(process.env.DB_CNN || '',{
        })

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');
    }

}