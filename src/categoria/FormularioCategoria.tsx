
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import Button from "../utils/Button";
import FormGroupText from "../utils/FormGroupText";
import { CreacionCategoriaDto } from "./categoria.model";

export default function FormularioCategoria(props: fomularioCategoriaProps) {

    return (
        <>
            <Formik initialValues={props.modelo}
                onSubmit={props.onSubmit}

                validationSchema={Yup.object({
                    nombre: Yup.string().required('Este Campo es requerido')
                    .max(50, 'La longitud máxima es de 50 caracteres').primeraLetraMayuscula()
                })}

            >
                {(formikProps) => (

                    <Form>
                        <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre Género" />

                        <Button disabled={formikProps.isSubmitting} type="submit" >Salvar</Button>
                        <Link className="btn btn-secondary" to="/generos">Cancelar</Link>

                    </Form>
                )}




            </Formik>
        </>
    )
}

interface fomularioCategoriaProps{
    modelo: CreacionCategoriaDto;
    onSubmit(valores: CreacionCategoriaDto, accion: FormikHelpers<CreacionCategoriaDto>): void;
}

