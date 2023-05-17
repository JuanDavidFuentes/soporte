import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import fileupload from "express-fileupload";
import usuario from "../routes/usuario.js";

class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT;
        this.connectarbd()
        this.routes() 
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(express.static('public'))  
        this.app.use(fileupload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    async connectarbd(){
        await dbConnection()
    }

    routes(){
        this.app.use("/api/usuarios",usuario)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server