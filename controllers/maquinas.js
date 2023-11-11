import Maquinas from "../models/maquinas.js";

const maquinaPost = async (req, res) => {
    const { nombre, serial, imagen, af, estadoMaquina } = req.body
    const maquina = new Maquinas({ nombre, serial, imagen, af, estadoMaquina })
    await maquina.save()
    res.json({
        "msg": `Registro de maquina ${nombre} exitosamente`
    })
}

const maquinaPut = async (req, res) => {
    const { id } = req.params
    const { nombre, serial, imagen, af, estadoMaquina } = req.body
    const maquina = await Maquinas.findByIdAndUpdate(id, { nombre, serial, imagen, af, estadoMaquina })
    res.json({
        "msg": `Registro de maquina ${nombre} fue editada exitosamente`
    })
}

const maquinaGet = async (req, res) => {
    const maquina = await Maquinas.find()
    res.json(maquina)
}

const desactivarMaquina = async (req, res) => {
    const { id } = req.params
    const desactivar = await Maquinas.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        "msg": " Maquina desactivada exitosamente"
    })
}

const activarMaquina = async (req, res) => {
    const { id } = req.params
    const activar = await Maquinas.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        "msg": " Maquina activada exitosamente"
    })
}

export { maquinaPost, maquinaPut, maquinaGet, desactivarMaquina, activarMaquina }