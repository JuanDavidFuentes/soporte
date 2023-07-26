import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import fileupload from "express-fileupload";
import usuario from "../routes/usuario.js";
import ciudad from "../routes/ciudades.js";
import maquina from "../routes/maquinas.js";
import empresa from "../routes/empresas.js";
import envio from "../routes/envios.js";

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.port = process.env.PORT;
    this.connectarbd();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static('public'))
    this.app.use(
      fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async connectarbd() {
    await dbConnection();
  }

  routes() {
    this.app.use("/api/usuarios", usuario);
    this.app.use("/api/ciudades", ciudad);
    this.app.use("/api/maquinas", maquina);
    this.app.use("/api/empresas", empresa);
    this.app.use("/api/envios", envio);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}

export default Server;
