import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import MostrarErrores from "../utils/MostrarErrores";
import { CategoriasPutGetDTO, CreacionProductoDTO } from "./producto.model";
import { urlProducto } from "../utils/endpoints";
import { convertirProductoAFormData } from "../utils/FormDataUtils";
import FormularioPeliculas from "./FormularioProducto";

export default function EditarProductos() {

    const [producto, setProducto] = useState<CreacionProductoDTO>();
    const [productoPutGet, setProductoPutGet] = useState<CategoriasPutGetDTO>();
    const { id }: any = useParams();
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>();

    useEffect(() => {
        axios.get(`${urlProducto}/PutGet/${id}`)
            .then((respuesta: AxiosResponse<CategoriasPutGetDTO>) => {
                const modelo: CreacionProductoDTO = {
                    nombre: respuesta.data.producto.nombre,
                    descripcion: respuesta.data.producto.descripcion,
                    stock: respuesta.data.producto.stock,
                    precio: respuesta.data.producto.precio,
                    imagenCargar: respuesta.data.producto.imagenUrl,
                    categoriaId: respuesta.data.producto.categoriaId
                }

                setProducto(modelo);
                setProductoPutGet(respuesta.data);

            })
    }, [id])

    async function editar(productoEditar: CreacionProductoDTO) {
        try {
            console.log(productoEditar)
            const formData = convertirProductoAFormData(productoEditar);
            await axios({
                method: 'put',
                url: `${urlProducto}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            navigate(`/pelicula/${id}`);

        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Si es un error de Axios, puedes acceder a la propiedad response
                setErrores(error.response?.data || ["Error al editar el producto"]);
            } else {
                // Si no es un error de Axios, muestra un mensaje genérico
                setErrores(["Ocurrió un error inesperado en editar producto"]);
            }
        }

    }

    return (
        <>
            <h3>Editar Peliculas</h3>
            <MostrarErrores errores={errores} />
            {producto && productoPutGet ? <FormularioPeliculas
                categoriasNoSeleccionados={productoPutGet.categoriasNoSeleccionados}
                modelo={producto}
                onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}

        </>
    );

}