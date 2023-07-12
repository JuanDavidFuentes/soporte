import Envio from "../models/envios.js"

const HelpersEnvios = {
    existEnvioById: async (id) => {
        const existe = await Envio.findById(id)
        if (!existe) throw new Error(`El envió con id:${id} no existe en la base de datos`)
    },
}

export default HelpersEnvios;  