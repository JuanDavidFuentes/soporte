import { Router } from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import { activarempresas, desactivarempresas, empresasGet, empresasPost, empresasPut } from "../controllers/empresas.js";
import HelpersMaquinas from "../helpers/maquinas.js";


const router = Router()

router.post("/", [
    validarJWT,
    check('nombre', "El nombre de la maquina es obligatorio").not().isEmpty(),
    check('nombre', "El nombre de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    validarCampos
], empresasPost );

router.put("/:id", [
    validarJWT,
    check('nombre', "El nombre de la maquina es obligatorio").not().isEmpty(),
    check('nombre', "El nombre de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existeempresasById),
    validarCampos
], empresasPut )


router.get("/", empresasGet )

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existeempresasById),
    validarCampos
], activarempresas )

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existeempresasById),
    validarCampos
], desactivarempresas )

export default router