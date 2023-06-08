import Ciudad from "../models/ciudades.js"

const ciudadPost=async(req,res)=>{
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPost = new Ciudad ({coddepartamento,departamento,ciudad,codciudad})
    await ciudadPost.save()
    res.json({
        "msg":"Registro Exitoso"
    })
}

const ciudadPut=async(req,res)=>{
    const {id}=req.params
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPut=await Ciudad.findByIdAndUpdate(id,{coddepartamento,departamento,ciudad,codciudad})
    res.json({
        "msg":`Actualización Exitosa!${ciudadPut}`
    })
}

const ciudadGetListarTodos=async(req,res)=>{
    const ciudad= await Ciudad.find()
    res.json({
        ciudad
    })
}

//listar ciudades de departamento
const ciudadesdepartamentoGet=async(req,res)=>{
    const {coddepartamento}=req.query;
    const departamentos= await Ciudad.find({coddepartamento})
    res.json({departamentos})
}

const buscarCiudadCodigoGet=async(req,res)=>{
    const {codciudad}=req.query;
    const ciudades= await Ciudad.findOne({codciudad})
    res.json({ciudades})
}

const buscarDepartamentoNombreGet=async(req,res)=>{
    const {departamento}=req.query;
    const departamentos= await Ciudad.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { departamento: new RegExp(departamento, "i") },
            ] 
        }
    ) 
    res.json({departamentos})
}

const buscarCiudadNombreGet=async(req,res)=>{
    const {ciudad}=req.query;
    const ciudades = await Ciudad.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { ciudad: new RegExp(ciudad, "i") },
            ],
        }
    ) 
    res.json({ciudades})
}

export {ciudadesdepartamentoGet,ciudadGetListarTodos,ciudadPut,ciudadPost,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet}