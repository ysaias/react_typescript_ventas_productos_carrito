import css from "./ProductoIndividual.module.css"
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import axios from "axios";
import { urlProducto } from "../utils/endpoints";
import { useContext } from "react";
import AlertaContext from "../utils/AlertContext";
import { productoDTO } from "./producto.model";

export default function ProductoIndividual(props: productoIndividualProps) {

    const construirLink = () => `/productos/${props.producto.id}`;
    const alerta = useContext(AlertaContext);

    function borrarProducto() {
        axios.delete(`${urlProducto}/${props.producto.id}`)
            .then(() => {
                alerta();
            })
    }

    return (

        <div className={css.div}>
            
            <Link to={construirLink()}>
                <img alt="imagen individual" src={props.producto.imagenUrl} />
            </Link>
            <p>
                <Link to={construirLink()} > {props.producto.nombre}</Link>
            </p>

           

                    <div>
                        <Link style={{ marginRight: '1rem' }} className="btn btn-info"
                            to={`/productos/editar/${props.producto.id}`}>Editar</Link>
                        <Button className="btn btn-danger"
                            onClick={() => confirmar(() => borrarProducto())}>Borarr</Button>
                    </div>
           

        </div>
    )
}

interface productoIndividualProps {
    producto: productoDTO;
}