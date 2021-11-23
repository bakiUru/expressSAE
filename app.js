import Clase from './classes/contenedorProductos.js';
import express from 'express';

//Server
const PORT = 8080;


//arranque del Server
const app = express();
//contendor
const product = new Clase();

const server = app.listen(PORT, ()=>{
    console.log(`Servidor express escuchando por el puerto: ${PORT}`);
})
//manejo de error
server.on('error',(error)=>{ console.log('Error en el server ' + error)});

//peticiones GET
app.get('/productos', (req,res)=>{
    product.getAll().then(resul=>{
        res.send(resul.datosRead);
    }
        );
      
})

app.get('/productosRandom/:uid', (req,res)=>{
    let id = parseInt(req.params.uid);
    product.getById(id).then(resul=>{
        res.send(resul);        
    })
       
    
})
 