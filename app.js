//Archivos
const rutaArchivo = "utils/productos.txt"
const fs = require('fs')

//Server
const express = require('express');
const PORT = 8080;


//arranque del Server
const app = express();

//Manejo del archivo 
const getProducts = async ()=>{
    try{
        let read = await fs.promises.readFile(rutaArchivo, 'utf-8');
        let datosProductos = JSON.parse(read);
        
        return {message: 'success', datos:datosProductos};
    }catch(error){
        return {status:"error", message:"No Hay Productos" + error};
    }
}


let product = [];
getProducts().then(resul=>{
    console.log(resul.datos)
    product = JSON.stringify(resul.datos);
    //Para mejorar la visualizacion. 
    product = product.replaceAll('{', '');
    product = product.replaceAll('[', '');
    product = product.replaceAll('}', '');
    product = product.replaceAll(']', '');
    product = product.replaceAll(',', `<br>`);
    product = product.replaceAll('"', '');
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor express escuchando por el puerto: ${PORT}`);
})
//manejo de error
server.on('error',(error)=>{ console.log('Error en el server ' + error)});

//peticiones GET
app.get('/productos', (req,res,next)=>{
    res.send(`<h1 style ="color:blue">Bienvenido a Productos</h1>
    <br><h3>Productos: </h3><br><br>${product}`);
      
})

app.get('/productosRandom/:uid', (req,res)=>{
    let id = parseInt(req.params.uid);
    getProducts().then(resul=>{
        //guardamos el resultado de la busqueda
        let producto = resul.datos.find(product=>product.id === id);
        console.log(id)
        //Formato texto para representarlo en HTML
        producto = JSON.stringify(producto);
            if(producto)
                res.send(`Producto ID: ${id}<br>${producto}`);
            else 
                res.send(`<h3>Producto No encontrado </h3><h4>ID: ${id} ¡No existe! </h4><br>`);
    })
       
    
    
})
