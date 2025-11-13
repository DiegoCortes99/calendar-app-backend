import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            uid?: string;
            name?: string;
        }
    }
}


export const validarJWT = (req: Request, res: Response, next: NextFunction) => {

    // x-token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const secret = process.env.SECRET_JWT_SEED || '';
        
        const { uid, name } = jwt.verify(token, secret) as { uid: string, name: string };

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

}