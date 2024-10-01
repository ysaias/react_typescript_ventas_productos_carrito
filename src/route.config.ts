
import LandingPage from "./LandingPage";
import CrearProducto from "./producto/CrearProducto";
import DetalleProducto from "./producto/DetalleProducto";
import EditarProductos from "./producto/EditarProducto";
import RedireccionarALandinpage from "./utils/RedireccionandoALanding";


const rutas = [

   { path: '/productos/:id', componente: DetalleProducto },
   { path: '/productos/crear', componente: CrearProducto },
   { path: '/productos/editar/:id', componente: EditarProductos },
   { path: '/', componente: LandingPage, exact: true },

   { path: '*', componente: RedireccionarALandinpage }
];

export default rutas;
