import {Router} from "express"
import {ciudadPut,ciudadesdepartamentoGet,ciudadGetListarTodos,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet,ciudadPost} from "../controllers/ciudades.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HelpersCiudad from "../helpers/ciudades.js"

const router=Router() 

router.post("/",[
    validarJWT,
    check('coddepartamento',"El codigo del departamento es obligatorio").not().isEmpty(),
    check('coddepartamento').isNumeric(),
    check('departamento',"El departamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codigo de la ciudad es obligatoria").not().isEmpty(),
    check('codciudad').isNumeric(),
    check('codciudad').custom(HelpersCiudad.existeciudadPorCodigo),
    validarCampos,
],ciudadPost)

router.put("/:id",[
    validarJWT,
    check('coddepartamento',"El codigo del departamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codigo de la ciudad es obligatorio").not().isEmpty(),
    validarCampos,
],ciudadPut)

router.get("/CiudadDepartamento",ciudadGetListarTodos)

router.get("/departamento",[
    check('coddepartamento',"El codigo del departamento es obligatorio").not().isEmpty(),
    check('coddepartamento').custom(HelpersCiudad.existedeoartamentoById),
    validarCampos
],ciudadesdepartamentoGet)

router.get("/ciudadnombre",[
    check('ciudad',"El nombre de la ciudad es obligatorio").not().isEmpty(),
    validarCampos
],buscarCiudadNombreGet)

router.get("/departamentonombre",[
    check('departamento',"El nombre del departamento es obligatorio").not().isEmpty(),
    validarCampos
],buscarDepartamentoNombreGet)

router.get("/municipio",[
    check('codciudad',"La ciudad es obligatoria").not().isEmpty(),
    validarCampos
],buscarCiudadCodigoGet)

export default router