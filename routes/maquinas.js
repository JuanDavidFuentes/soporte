import { Router } from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import { activarMaquina, desactivarMaquina, maquinaGet, maquinaPost, maquinaPut } from "../controllers/maquinas.js";
import HelpersMaquinas from "../helpers/maquinas.js";

const router = Router()

router.post("/", [
    validarJWT,
    check('nombre', "El nombre de la maquina es obligatorio").not().isEmpty(),
    check('nombre', "El nombre de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    check('serial', "El serial de la maquina es obligatorio").not().isEmpty(),
    check('serial', "El serial de la maquina es de máximo 200 letras").isLength({ max: 200 }),
    check('af', "El codigo af de la maquina es obligatorio").not().isEmpty(),
    check('af', "El codigo af de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    check('estadoMaquina', "El estado de la maquina es obligatorio").not().isEmpty(),
    check('estadoMaquina', "El estado de la maquina debe de ser numerico").isNumeric(),
    validarCampos
], maquinaPost);

router.put("/:id", [
    validarJWT,
    check('nombre', "El nombre de la maquina es obligatorio").not().isEmpty(),
    check('nombre', "El nombre de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    check('serial', "El serial de la maquina es obligatorio").not().isEmpty(),
    check('serial', "El serial de la maquina es de máximo 200 letras").isLength({ max: 200 }),
    check('af', "El codigo af de la maquina es obligatorio").not().isEmpty(),
    check('af', "El codigo af de la maquina es de máximo 50 letras").isLength({ max: 50 }),
    check('estadoMaquina', "El estado de la maquina es obligatorio").not().isEmpty(),
    check('estadoMaquina', "El estado de la maquina debe de ser numerico").isNumeric(),
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existemaquinaById),
    validarCampos
], maquinaPut)


router.get("/", maquinaGet)

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existemaquinaById),
    validarCampos
],activarMaquina)

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersMaquinas.existemaquinaById),
    validarCampos
],desactivarMaquina)

export default router