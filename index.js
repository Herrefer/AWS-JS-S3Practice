import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import enrutadorS3 from './src/routes/S3.routes.js'


const app = express();
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () =>{
    console.log("Funciona! estas en el puerto " + app.get('port'));
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

app.get('/', (req, res) => {
    res.json({message: "funciona la req!"})
})


app.use('/api', enrutadorS3);