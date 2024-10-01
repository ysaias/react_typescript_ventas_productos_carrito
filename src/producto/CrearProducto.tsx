import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { CategoriaDto } from "../categoria/categoria.model";
import { urlProducto } from "../utils/endpoints";
import { CategoriasPostGetDTO, CreacionProductoDTO } from "./producto.model";
import { convertirProductoAFormData } from "../utils/FormDataUtils";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioProducto from "./FormularioProducto";

export default function CrearProducto() {

    const [categoriasNoSeleccionados, setCategoriasNoSeleccionados] = useState<CategoriaDto[]>([]);
    const [cargado, setCargado] = useState(false);
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);
   
    useEffect(() => {
        axios.get(`${urlProducto}/postget`)
        .then((respuesta: AxiosResponse<CategoriasPostGetDTO>) => {
            setCategoriasNoSeleccionados(respuesta.data.categorias);
            setCargado(true);
        })
    }, [])

    async function crear(producto: CreacionProductoDTO){
        try {
            const formData = convertirProductoAFormData(producto);
            await axios({
                method: 'post',
                url: urlProducto,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                navigate(`/productos/${respuesta.data}`);
            })
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Si es un error de Axios, puedes acceder a la propiedad response
                setErrores(error.response?.data || ["Error al crear el producto"]);
            } else {
                // Si no es un error de Axios, muestra un mensaje genérico
                setErrores(["Ocurrió un error inesperado"]);
            }
        }
    }

    return (
        <>
            <h3>Crear Producto</h3>
            <MostrarErrores errores={errores} />
            {cargado ?  
                <FormularioProducto
                    categoriasNoSeleccionados={categoriasNoSeleccionados}
                    modelo={{ nombre: '', descripcion: '', precio: 0, stock: 0, categoriaId: 0 }}
                    onSubmit={async valores => crear(valores)}
                /> : 
                <Cargando />
            }
        </>
    );
}
