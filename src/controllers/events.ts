import { Request, Response } from "express"
import { Types } from "mongoose";
import { Evento } from "../models/Evento"


export const getEventos = async(req:Request, res:Response) =>{

    const evento = await Evento.find().populate('user','name')

    res.status(200).json({
        ok:true,
        evento: evento
    })

}

export const crearEvento = async(req:Request, res:Response) =>{

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid ? new Types.ObjectId(req.uid) : undefined;

        const eventoGuardado = await evento.save()

        res.status(201).json({
            ok:true,
            evento:eventoGuardado
        })
        
    } catch (error) {
        res.status(200).json({
            ok:false,
            msg:'Comunicarse con el administrador'
        })
        console.log(error);
    }
    }

export const actualizarEvento = async(req:Request, res:Response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        
        const evento = await Evento.findById(eventoId);

        if( !evento ){
            return res.status(404).json({
                ok:false,
                msg:"Evento no exites por ese id"
            });
        }

        if( evento?.user?.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegio de editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento,{new:true});

        res.status(200).json({
            ok:true,
            evento:eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

export const eliminarEvento = async(req:Request, res:Response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        
        const evento = await Evento.findById(eventoId);

        if( !evento ){
            return res.status(404).json({
                ok:false,
                msg:"Evento no exites por ese id"
            });
        }

        if( evento?.user?.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegio de eliminar este evento"
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId,{new:true})

        res.status(200).json({
            ok:true,
            evento:eventoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }

}