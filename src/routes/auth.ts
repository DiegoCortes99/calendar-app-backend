import { Router } from "express"
import { crearUsuario, loginUsuario, revalidarToken } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

export const authRouter = Router();

authRouter.post('/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 digitos').isLength({min:6}),
        validarCampos
    ],
    crearUsuario)

authRouter.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 digitos').isLength({min:6}),
        validarCampos
    ],
    loginUsuario)



authRouter.get('/renew', validarJWT, revalidarToken)

