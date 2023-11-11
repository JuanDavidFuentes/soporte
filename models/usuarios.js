import mongoose from "mongoose";
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, maxlength: 50, require: true },
  apellido: { type: String, maxlength: 50, require: true },
  documento: { type: String, minlength: 8, require: true },
  direccion: { type: String, maxlength: 50, required: true },
  celular: { type: String, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minlength: 8 , required: true, },
  rol: { type: String, default: "AUXILIAR" },
  foto: { type: String },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
});
export default mongoose.model("Usuario", UsuarioSchema);
