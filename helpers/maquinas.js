import Mauinas from "../models/maquinas.js"
import Empresas from "../models/empresas.js"

const HelpersMaquinas = {
    existemaquinaById: async (id) => {
        const existe=await Mauinas.findById(id)
        if(!existe) throw new Error(`La maquina con id:${id} no existe en la base de datos`)
    },
    existeempresasById: async (id) => {
        const existe=await Empresas.findById(id)
        if(!existe) throw new Error(`La empresa con id:${id} no existe en la base de datos`)
    },
}

export default HelpersMaquinas;  