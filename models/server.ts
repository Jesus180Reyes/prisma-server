import express, { Application } from 'express'
import cors from 'cors';
import { prisma } from '../config/prisma/prisma';
import user from '../routes/user.routes';

export class Server {
    public paths = {
        user: '/api/user',
    }
    public app:Application;
    public port:string

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || "8080";

        

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try {
            await prisma.$connect();
            console.log("Conectado a la BD!!");
        } catch (error) {
            await prisma.$disconnect();
            console.log("Hable con el administrador:: ", error);
        }
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        // this.app.use( fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));

    }

    routes() {
        
        this.app.use( this.paths.user, user);
        
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}



