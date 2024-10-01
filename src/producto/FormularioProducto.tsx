import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Button from "../utils/Button";
import FormGroupImagen from "../utils/FormGroupImagen";
import { CategoriaDto } from "../categoria/categoria.model";
import { CreacionProductoDTO } from "./producto.model";
import FormGroupText from "../utils/FormGroupText";
import FormGroupMarkdown from "../utils/FormGroupMarkDown";
import MostrarErrorCampo from "../utils/MostrarErrorCampo";

export default function FormularioProducto(props: formularioPeliculasProps) {
    return (
        <Formik
          initialValues={props.modelo}
          onSubmit={(valores, acciones) => {
            // Asigna el valor seleccionado de la categoría al DTO
            props.onSubmit(valores, acciones);
          }}
          validationSchema={Yup.object({
            nombre: Yup.string().required("Este campo es Requerido"),
            descripcion: Yup.string().required("Este campo es Requerido"),
            stock: Yup.number().required("Este campo es Requerido").positive(),
            precio: Yup.number().required("Este campo es Requerido").positive(),
            categoriaId: Yup.number().required("Debe seleccionar una categoría")
          })}
        >
          {(formikProps) => (
            <Form>
              <FormGroupText label="Nombre" campo="nombre" />
              <FormGroupText label="Descripción" campo="descripcion" />
              <FormGroupText label="Stock" campo="stock" type="number" />
              <FormGroupText label="Precio por Unidad" campo="precio" type="number" />
              <FormGroupImagen campo="imagenUrl" label="Imagen" imagenUrl={props.modelo.imagenCargar} />
              <FormGroupMarkdown campo="descripcion" label="Descripción Detallada" />
    
              {/* Campo de selección de categoría */}
              <div className="form-group">
                <label htmlFor="categoriaId">Categoría</label>
                <Field as="select" name="categoriaId" className="form-control">
                  <option value="">Seleccione una categoría</option>
                  {props.categoriasNoSeleccionados.map((categoria: CategoriaDto) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="categoriaId">
                  {mensaje => <MostrarErrorCampo mensaje={mensaje} />}
                </ErrorMessage>
              </div>
                

                  <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                  <Link className="btn btn-secondary" to="/">Cancelar</Link>
              </Form>
          )}
      </Formik>
  )
}

interface formularioPeliculasProps {

    modelo: CreacionProductoDTO;
    onSubmit(valores: CreacionProductoDTO, 
           acciones: FormikHelpers<CreacionProductoDTO>): void;
    categoriasNoSeleccionados: CategoriaDto[];
   
}