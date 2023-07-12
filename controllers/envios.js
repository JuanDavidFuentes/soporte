import Envio from "../models/envios.js"
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpers/subir-archivo.js";
import { v2 as cloudinary } from 'cloudinary'

const crearEnvio = async (req, res) => {
    const { idMaquina, ciudad, empresa, numeroGuia, motivoEnvio, imgGuia } = req.body;
    const envio = new Envio({ idMaquina, ciudad, empresa, numeroGuia, motivoEnvio, imgGuia })
    await envio.save()
    res.json({
        "msg": `Envió registrado satisfactoriamente con el numero de guía ${numeroGuia}`
    })
}

const cargarArchivoCloud= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let envio = await Envio.findById(id);
                    if (envio.imgGuia) {
                        const nombreTemp = envio.imgGuia.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    envio = await Envio.findByIdAndUpdate(id, { imgGuia: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }

            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const imgPut=async(req, res)=>{
    const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let envio = await Envio.findById(id);
            //si el usuario ya tiene foto la borramos
            if (envio.imgGuia) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', envio.imgGuia);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            envio= await Envio.findByIdAndUpdate(id, { imgGuia: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
}


const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params

    try {
        let envio = await Envio.findById(id)
        if (envio.imgGuia) {
            return res.json({ url: envio.imgGuia })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let envio = await Envio.findById(id)
        if (envio.imgGuia) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', envio.imgGuia);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const envioPut = async ( req, res ) => {
    const { id } = req.params
    const { idMaquina, ciudad, empresa, numeroGuia, motivoEnvio, imgGuia } = req.body;
    const envio = await Envio.findByIdAndUpdate( id, { idMaquina, ciudad, empresa, numeroGuia, motivoEnvio, imgGuia })
    res.json({
        "msg": `Envió editado satisfactoriamente con el numero de guía ${numeroGuia}`
    })
}

const envioGet = async (req, res) => {
    const envio = await Envio.find()
    .populate({
        path : "idMaquina"
    })
    .populate({
        path : "ciudad"
    })
    .populate({
        path : "empresa"
    })
    res.json(envio)
}

const desactivarEnvio = async (req, res) => {
    const { id } = req.params
    const desactivar = await Envio.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        " msg ": "Envió desactivado exitosamente"
    })
}

const activarEnvio = async (req, res) => {
    const { id } = req.params
    const activar = await Envio.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        " msg ": "Envió activado exitosamente"
    })
}

export { crearEnvio, envioPut, envioGet, desactivarEnvio, activarEnvio, cargarArchivoCloud, imgPut, mostrarImagenCloud, mostrarImagen }