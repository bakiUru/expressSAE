import fs from 'fs'

const rutaProducto = './utils/productos.txt';



class Contenedor{

    //Recibe un objeto lo guarda en el archivo, devuelve el id Asignado (WRITE)
    async save(datos){
        try{
            //levantamos el archivo y leemos los datos
            let read = await fs.promises.readFile(rutaProducto,'utf-8');
            //capturo en el arreglo los datos
            let datosRead = JSON.parse(read);
            let newId = datosRead.length + 1;
            //Controlo si ya existe un ID por haberlo borrado o algun problema
            while(datosRead.some(id=>id.id === newId)){
                newId++;
            }
            //agrego el producto nuevo al arreglo
            datos = Object.assign({id: newId}, datos);
            datosRead.push(datos);
            console.log(datos)
            //escribo en el archivo
            try{
                await fs.promises.writeFile(rutaProducto,JSON.stringify(datosRead, null ,2));
                return {status:"success", message:"Producto Añadido con Exito... ID: "+newId};
            }catch(err){
                return {status:"error", message:"No se pudo Añadir un nuevo Producto :("+ err};
            }
            
            
          //Si es el Primer elemento Crea el Arreglo       
        }catch{
            datos = Object.assign({id:1},datos)
            try{
                await fs.promises.writeFile(rutaProducto,JSON.stringify([datosRead],null,2));
                return {status:"success", message:"Producto Añadido con Exito... ID: "+newId};
            }
            catch(err){
                return {status:"error", message:"No se pudo Añadir un nuevo Producto :("+ err};
            }
        }
    }
    
    //recibe un ID y devuelve el objeto con ese id asignado
    async getById(numeroId){
            try{
            //leo el archivo 
            let read = await fs.promises.readFile(rutaProducto,'utf-8');
            //capturo en el arreglo los datos
            let datosRead = JSON.parse(read);
            //Guardo el id encontrado
            let productoId = datosRead.find(dataid => dataid.id === numeroId )
             if(productoId != null)
             return {status:"success", productoId : productoId};
             else
             return {status:"error", message:"No se encontró el Producto ID: " +`${numeroId}`};
            }catch(err){
                return {status:"error", message:"No se pudo levantar el Producto " + err};
            }
    
    }
    //Devuelve un array con todos los objetos presentes en el archivo (READ)
    async getAll(){
        try{
            //leo el archivo 
            let read = await fs.promises.readFile(rutaProducto,'utf-8');
            //capturo en el arreglo los datos
            let datosRead = JSON.parse(read);
            //Guardo el id encontrado
                return {status:"success", datosRead : datosRead};

            }catch(err){
                return {status:"error", message:"No Hay Productos para Leer" + err};
            }
    
    }
    
    
    //Elimina del archivo el objeto con el ID buscado
    async deleteById(numeroId){
        try{
            //leo el archivo 
            let read = await fs.promises.readFile(rutaProducto,'utf-8');
            //capturo en el arreglo los datos
            let datosRead = JSON.parse(read);
            //Guardo el id encontrado
            let productoId = datosRead.find(dataid => dataid.id === numeroId )
             if(productoId)
                {
                    datosRead = datosRead.filter((id)=>{
                        return id.id !== numeroId;
                    })
                    try{
                        await fs.promises.writeFile(rutaProducto,JSON.stringify(datosRead, null, 2));
                        return {status:"success", message:"Se elimino el Producto del Archivo"};
                    }catch(err){
                        return {status:"error", message:"No se pudo Sobreescribir el Archivo :("+ err};
                    }
                }
                else
                    return {status:"error", message:"No se encontro el producto a Eliminar :( "};
               
            }catch(err){
                return {status:"error", message:"No se encontro el producto a Eliminar :( " + err};
            }
    }
    
    //Elimina todos los objetos presentes en el Archivo
    async deleteAll(){
        try{
            await fs.promises.writeFile(rutaProducto," ");
            return {status:"success", message:"Se elimino el contenido del Archivo"};
        }catch(err){
            return {status:"error", message:"No se encontro el Archivo a Eliminar :("+ err};
        }
    }
    

    //Actualiza Producto
    async updateProduct(id,body){
        try{
            let read = await fs.promises.readFile(ruta,'utf-8');
            let datosRead = JSON.parse(read);
            //controlo el Id ingresado
            if(!datosRead.some(product => product.id === id)) 
                return {status: "error", message: `No tenemos ningun producto con ese ID: ${id}`}
            let data = datosRead.map(product=>{
                if(product.id ===id)
                {
                    body = Object.assign({id:product.id,...body});
                    return body;

                }else 
                    return product;

            })

            try{
                //Sobre escribo el archivo con la actualizacion del Producto
                await fs.promises.writeFile(rutaProducto,JSON.stringify(data,null2));
                return {status:'sucess', message:'Se actualizo Correctamente el Producto'}
            }catch{
                return {status:'error', message:'No se pudo Actualizar el Producto'}
            }

        }catch(error){
            return {status:'error', message:'No se pudo Actualizar el Producto'+error}
        }
    }
 }

export default Contenedor;