import mongoose from "mongoose";

const EnviosSchema = new mongoose.Schema({
    idMaquina: { type: mongoose.Schema.ObjectId, ref: "Maquinas", required: true },
    ciudad: { type: mongoose.Schema.ObjectId, ref: "Ciudades", required: true }, // departamento
    empresa: { type: mongoose.Schema.ObjectId, ref: "Empresas", required: true },
    numeroGuia: { type: String, required: true },
    motivoEnvio: { type: String, required: true },
    imgGuia: { type: String },
    estado: { type: Number, default: 1 }, // 1: enviado, 0: resivido
    createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model("Envios", EnviosSchema);
