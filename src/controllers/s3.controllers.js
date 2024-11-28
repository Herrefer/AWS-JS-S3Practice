import fileUpload from "express-fileupload";
import fs from "fs";
import { client } from "../../s3.js";
import { AWS_BUCKET_NAME } from "../../helpers/config.js";
import {
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const listarDatos = async (req, res) => {
  try {
    const command = new ListObjectsCommand({
      Bucket: AWS_BUCKET_NAME,
    });
    const resultado = await client.send(command);
    return res.status(200).json(resultado.Contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "error al enviar la solicitud get" });
  }
};

export const listarDato = async (req, res) => {
  try {
    const commandKey = req.params.fileName;
    console.log(commandKey);
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: commandKey,
    });
    console.log(command);
    const result = await client.send(command);
    console.log(result);
    return res.status(200).json(result.$metadata)
    // aqui se puede utilizar el MetadataDirective, que solo tiene información de la solicitud.
    // Lo importante sería sacar los datos del archivo mismo (tamaño,tipo, etc) que estan justo debajo del metadata
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "error al enviar la solicitud get" });
  }
};

export const genURLFirmada = async (req, res) => {
  try {
    const commandKey = req.params.fileName;
    console.log(commandKey);
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: commandKey,
    });
    console.log(command);
    const result = await getSignedUrl(client, command, {expiresIn: 360})
    return res.status(200).json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "error al enviar la solicitud get" });
  }
};

export const descargarArchivo = async (req, res) => {
  try{
      const downloadKey = req.params.fileName;
      console.log(downloadKey);
      const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: downloadKey
      })
      const result = await client.send(command);
      console.log(result);
      result.Body.pipe(fs.createWriteStream(`./downloads/${downloadKey}`))
      return res.status(200).json({mensaje: "elemento descargado correctamente!"})
  }catch(error){
    console.error(error);
    res.status(500).json({mensaje: "error al enviar solicitud de descarga"})
  }
}

export const subirArchivo = async (req, res) => {
  try {
    const datosArchivo = req.files.archivo;
    const stream = fs.createReadStream(datosArchivo.tempFilePath);
    console.log(stream);
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: datosArchivo.name,
      Body: stream,
    };
    const command = new PutObjectCommand(uploadParams);
    const result = await client.send(command);
    console.log(result);
    res
      .status(200)
      .json({ mensaje: "archivo subido en la nube correctamente!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "error al enviar la solicitud post" });
  }
};
