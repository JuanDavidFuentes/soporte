import { Router } from "express"
import { usuarioPost, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, cargarArchivoCloudPut, usuarioLogin, usuarioGetListarTodos, mostrarImagenCloud, usuarioGetListarid, usuarioGetListarNombre } from "../controllers/usuario.js"
import { check } from "express-validator";
import HerlpersUsuario from "../helpers/usuario.js";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";
const router = Router()

router.post("/", [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('nombre', "El nombre debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('apellido', "Los apellidos son obligatorios").not().isEmpty(),
    check('apellido', "Los apellidos deben de tener menos de 50 caracteres").isLength({ max: 50 }),
    check('documento', "El documento es obligatorio").not().isEmpty(),
    check('documento', "El documento debe tener mas de 8 caracteres").isLength({ min: 8 }),
    check('documento').custom(HerlpersUsuario.existeDocumento),
    check('direccion', "La direccion es obligatoria").not().isEmpty(),
    check('direccion', "La direccion debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('celular', "El celular es obligatoro").not().isEmpty(),
    check('celular', "El celular debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('email', "El email es Obligatorio").not().isEmpty(),
    check('email', "No es un email valido").isEmail(),
    check('email').custom(HerlpersUsuario.existeEmail),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    check('password', "La contraseña debe tener mas de 8 caracteres").isLength({ min: 6 }),
    validarCampos,
], usuarioPost);

router.put("/datos/:id", [
    validarJWT,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('nombre', "El nombre debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('apellido', "Los apellidos son obligatorios").not().isEmpty(),
    check('apellido', "Los apellidos deben de tener menos de 50 caracteres").isLength({ max: 50 }),
    check('direccion', "La direccion es obligatoria").not().isEmpty(),
    check('direccion', "La direccion debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('celular', "El celular es obligatoro").not().isEmpty(),
    check('celular', "El celular debe tener menos de 50 caracteres").isLength({ max: 50 }),
    //check('email', "El email es Obligatorio").not().isEmpty(),
    //check('email', "No es un email valido").isEmail(),
    //check('email').custom(HerlpersUsuario.existeEmail),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    check('password', "La contraseña debe tener mas de 8 caracteres").isLength({ min: 6 }),
    check('rol', "El rol debe tener menos de 50 caracteres").isLength({ max: 50 }),
    validarCampos,
], usuarioPut)



router.post("/login", [
    check('email').custom(HerlpersUsuario.noexisteEmail),
    check('email', "No es un email valido").isEmail(),
    validarCampos
], usuarioLogin)

router.get("/", usuarioGetListarTodos)

router.get("/listar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], usuarioGetListarid)

router.get("/nombre", [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], usuarioGetListarNombre)

router.get("/Mostrarimagen/:id", [
    check('id', 'No es un ID válido'),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], mostrarImagenCloud)

router.put("/Subirimagen/:id", [
    validarJWT,
    check('id').not().isEmpty(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarExistaArchivo,
    validarCampos
], cargarArchivoCloudPut)

router.put("/activar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], usuarioPutActivar)

router.put("/desactivar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], usuarioPutDesactivar)

export default router;
