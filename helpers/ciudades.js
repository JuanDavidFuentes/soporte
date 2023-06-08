import Ciudad from "../models/ciudades.js";

const HelpersCiudad = {

    existedeoartamentoById: async (coddepartamento) => {
        if (coddepartamento) {
          const existe = await Ciudad.findOne({ coddepartamento });
          if (!existe) throw new Error(`codigo ${coddepartamento} no existe en la base de datos`);
      }
    },  

    existeciudadById: async (id) => {
        const existe=await Ciudad.findById(id)
        if(!existe) throw new Error(`codigo ${id} no existe en la base de datos`)
    },
    existeciudadPorCodigo: async (codciudad) => {
        if (codciudad) {
          const existe = await Ciudad.findOne({ codciudad });
          if (existe) throw new Error(`codigo ${codciudad} existe en la base de datos`);
      }
    },
}

export default HelpersCiudad;  