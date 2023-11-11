import Empresas from "../models/empresas.js";

const empresasPost = async (req, res) => {
    const { nombre } = req.body
    const empresas = new Empresas({ nombre })
    await empresas.save()
    res.json({
        "msg": `Registro de empresa "${nombre}" exitosamente`
    })
}

const empresasPut = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const empresas = await Empresas.findByIdAndUpdate(id, { nombre })
    res.json({
        "msg": `Registro de empresas "${nombre}" fue editada exitosamente`
    })
}

const empresasGet = async (req, res) => {
    const empresas = await Empresas.find()
    res.json(empresas)
}

const desactivarempresas = async (req, res) => {
    const { id } = req.params
    const desactivar = await Empresas.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        "msg": "Empresa desactivada exitosamente"
    })
}

const activarempresas = async (req, res) => {
    const { id } = req.params
    const activar = await Empresas.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        "msg": "Empresa activada exitosamente"
    })
}

export { empresasPost, empresasPut, empresasGet, desactivarempresas, activarempresas }