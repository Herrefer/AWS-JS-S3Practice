import { Router } from "express";

import { descargarArchivo, listarDatos, genURLFirmada } from "../controllers/s3.controllers.js";
import { listarDato } from "../controllers/s3.controllers.js";
import { subirArchivo } from "../controllers/s3.controllers.js";

const enrutador = Router();

enrutador.route('/s3get').get(listarDatos);
enrutador.route('/s3getone/:fileName').get(listarDato);
enrutador.route('/s3downloadone/:fileName').get(descargarArchivo);
enrutador.route('/s3post').post(subirArchivo);
enrutador.route('/s3geturl/:fileName').get(genURLFirmada)

export default enrutador