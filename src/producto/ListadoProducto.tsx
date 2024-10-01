
import css from './ListadoProductos.module.css'
import ListadoGenerico from "../utils/ListadoGenerico";
import { productoDTO } from "./producto.model";
import ProductoIndividual from './ProductoIndividual';


export default function ListadoProductos(props: listadoProductos) {


    return (

        <ListadoGenerico listado={props.productos} 
       >
        <div className={css.div}>
            {props.productos?.map(producto =>
                <ProductoIndividual producto={producto}
                    key={producto.id} />
            )}
        </div>

        </ListadoGenerico>
    )
}


interface listadoProductos {
    productos?: productoDTO[];
}