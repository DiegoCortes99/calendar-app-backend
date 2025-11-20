import { Router } from "express";
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events";
import { validarJWT } from "../middlewares/validar-jwt";
import { check, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { isDate } from "../helpers/isDate";

export const eventsRouter = Router();

// Para no utilizar validarJWT en todos los rutas
eventsRouter.use(validarJWT);

eventsRouter.get('/', getEventos)

eventsRouter.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate)
],validarCampos, crearEvento)

eventsRouter.put('/:id',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate)
],validarCampos, actualizarEvento)

eventsRouter.delete('/:id',[
    param('id').exists().withMessage('ID is required')
],validarCampos, eliminarEvento)
