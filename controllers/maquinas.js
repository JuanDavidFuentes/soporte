import Maquinas from "../models/maquinas.js";
import { v2 as cloudinary } from 'cloudinary'

const maquinaPost = async ( req, res ) => {
    const { nombre, serial, imagen, tipo, estado, daño } = req.body
    const maquina = new Maquinas ({ nombre, serial, imagen, tipo, estado, daño, solucion })
    await maquina.save()
    res.json({
        "msg" : `Registro de maquina ${tipo} exitosamente`
    })
}

const maquinaPut = async (req, res) => {
    const { id } = req.params
    const { estado, solucion } = req.body
    const maquina = await Maquinas.findByIdAndUpdate( id, { estado, solucion })
}

export { maquinaPost }