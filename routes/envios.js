import { Router } from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";
import HelpersEnvios from "../helpers/envios.js";
import HelpersCiudad from "../helpers/ciudades.js";
import HelpersMaquinas from "../helpers/maquinas.js";
import { activarEnvio, cargarArchivoCloud, crearEnvio, desactivarEnvio, envioGet, envioPut, imgPut, mostrarImagen, mostrarImagenCloud } from "../controllers/envios.js";
const router = Router()

router.post('/',[
    validarJWT,
    check("idMaquina" , "Elija una maquina o equipo porfavor").not().isEmpty(),
    check("idMaquina").isMongoId(),
    check("idMaquina").custom(HelpersMaquinas.existemaquinaById),
    check("ciudad" , "La ciudad es obligatoria").not().isEmpty(),
    check("ciudad").isMongoId(),
    check("ciudad").custom(HelpersCiudad.existeciudadById),
    check("empresa" , "Elija una empresa").not().isEmpty(),
    check("empresa").isMongoId(),
    check("empresa").custom(HelpersMaquinas.existeempresasById),
    check("numeroGuia" , "El numero de la guia es obligatorio").not().isEmpty(),
    check("motivoEnvio" , "El motivo es obligatorio").not().isEmpty(),
    validarCampos
], crearEnvio)

router.put('/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById),
    check("idMaquina" , "Elija una maquina o equipo porfavor").not().isEmpty(),
    check("idMaquina").isMongoId(),
    check("idMaquina").custom(HelpersMaquinas.existemaquinaById),
    check("ciudad" , "La ciudad es obligatoria").not().isEmpty(),
    check("ciudad").isMongoId(),
    check("ciudad").custom(HelpersCiudad.existeciudadById),
    check("empresa" , "Elija una empresa").not().isEmpty(),
    check("empresa").isMongoId(),
    check("empresa").custom(HelpersMaquinas.existeempresasById),
    check("numeroGuia" , "El numero de la guia es obligatorio").not().isEmpty(),
    check("motivoEnvio" , "El motivo es obligatorio").not().isEmpty(),
    validarCampos
], envioPut)

router.get("/", envioGet )

router.put("/cargarCloud/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById),
    validarExistaArchivo,
    validarCampos
],cargarArchivoCloud);

router.get("/uploadClou/:id",[ // img
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById), 
    validarCampos   
],mostrarImagenCloud)

router.get("/upload/:id",[//img
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById), 
    validarCampos   
],mostrarImagen)

router.put("/imgEditar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById),
    validarExistaArchivo,
    validarCampos
],imgPut);

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById),
    validarCampos
],activarEnvio)

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnvios.existEnvioById),
    validarCampos
],desactivarEnvio)


export default router;
