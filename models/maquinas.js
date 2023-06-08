import mongoose from "mongoose";

const MaquinasSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50 },
  serial: { type: String, required: true, maxlength: 200 },
  imagen: { type: String },
  tipo: { type: String, required: true, maxlength:50 },
  estado: { type: Number, default: 1 }, // 0: Dañado, 1: Bueno
  daño: { type: String, default:""},
  solucion: { type: String, default:"" },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Maquinas", MaquinasSchema);
