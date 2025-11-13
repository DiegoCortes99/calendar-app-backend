import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import bcrypt from "bcryptjs";
import { generarJWT } from '../helpers/jwt';


export const crearUsuario = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email })

        console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const token = await generarJWT(usuario.id, usuario.name)

        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hablar con administrador"
        })

    }

}

export const loginUsuario = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email })

        console.log(usuario);

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })
        }

        // Confirmar password
        const validPassword = await bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hablar con administrador"
        })
    }

}

export const revalidarToken = async (req: Request, res: Response) => {

    const { uid, name } = req;

    if (!uid || !name) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token

    })
}