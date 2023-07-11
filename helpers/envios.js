import envio from "../models/envios.js"

const HelpersEnvios = {
    existEnvioById: async (id) => {
        const existe = await envio.findById(id)
        if (!existe) throw new Error(`El envió con id:${id} no existe en la base de datos`)
    },
}

export default HelpersEnvios;  