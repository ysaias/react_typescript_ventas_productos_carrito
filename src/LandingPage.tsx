import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LandingPageDTO } from "./producto/producto.model";
import AlertaContext from "./utils/AlertContext";
import { urlProducto } from "./utils/endpoints";
import ListadoProductos from "./producto/ListadoProducto";

export default function LandingPage(){

    const [productos, setProductos] = useState<LandingPageDTO>({});


   

  function cargarDatos(){
    axios.get(urlProducto)
    .then((respuesta: AxiosResponse<LandingPageDTO>) => {
      setProductos(respuesta.data);
      console.log(respuesta.data);

    }) 
  }

  useEffect(() => {
        
    cargarDatos();
  
    
  }, []);


    return(
        <>

       
        <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>En Prodcutos</h3>
        <ListadoProductos productos={productos.productos}/>

        </AlertaContext.Provider>
        
        </>
    )
}


