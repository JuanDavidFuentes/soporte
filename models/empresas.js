import mongoose from "mongoose";

const EmpresasSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Empresas", EmpresasSchema);