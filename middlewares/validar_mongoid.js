import mongoose from 'mongoose';
import HerlpersUsuario from '../helpers/usuario.js';

const validarResponsable = (responsable) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(responsable);
        if (!valido) {
            reject("id no valido");
        } else {
            const xx = await HerlpersUsuario.existeUsuarioById(responsable);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })

}
export {validarResponsable}
