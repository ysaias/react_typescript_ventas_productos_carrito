import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { productoDTO } from "./producto.model";
import axios, { AxiosResponse } from "axios";
import { urlProducto } from "../utils/endpoints";
import Cargando from "../utils/Cargando";
import ReactMarkdown from "react-markdown";

export default function DetalleProducto() {

    const { id }: any = useParams();
    const [producto, setProducto] = useState<productoDTO>();

    useEffect(() => {
        axios.get(`${urlProducto}/${id}`)
            .then((respuesta: AxiosResponse<productoDTO>) => {
                console.log(respuesta.data);
                setProducto(respuesta.data);
            })
    }, [id])
       

    return (
        producto ?
            
            <div style={{ display: "flex" }}>
                
                <div>
                    <h2>{producto.nombre} </h2>      

                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <img src={producto.imagenUrl} style={{ width: '225px', height: '315px' }} alt="poster" />
                        </span>
                       
                    </div>

                    {producto.descripcion ?
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Descripción </h3>
                            <div>
                                <ReactMarkdown>{producto.descripcion}</ReactMarkdown>
                            </div>
                        </div> : null}

                    <div style={{ marginTop: '1rem' }}>
                       
                        <div>
                            <p>Stok: {producto.stock}</p>
                            <p>Precio: {producto.precio}</p>
                        </div>
                    </div>

                </div>

            </div> : <Cargando />
    );
}