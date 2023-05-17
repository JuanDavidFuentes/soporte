import Usuario from "../models/usuarios.js";
//mongodb://localhost:27017/laboratorio
const HerlpersUsuario = {
  existeEmail: async (email) => {
    if (email) {
      const existe = await Usuario.findOne({ email });
      if (existe) throw new Error("Email ya existe en la bd");
    }
    return true
  },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      throw new Error(`El id  ${id} no existe`)
    }
    return true
  },

//   existeUsuarioById2: async (id) => {
//     const existe = await Usuario.findById(id)
//     if (!existe) {
//       return false
//     }
//     return true
//   },

  existeUsuarioNombre: async (nombre) => {
    const Existe= await Usuario.findOne({nombre})
    if (!Existe) {
      throw new Error(`El nombre: ${nombre} no existe`)
    }
    return true
  },

  noexisteEmail:async(email)=>{
    if(email){
        const existe=await Usuario.findOne({email})
        if(!existe) throw new Error("Correo no existe Base de datos")
    }
  },

  existeDocumento: async (documento) => {
    if (documento) {
      const existe = await Usuario.findOne({ documento });
      if (existe) throw new Error("documento ya existe en la bd");
    }
    return true
  },
}

export default HerlpersUsuario;              