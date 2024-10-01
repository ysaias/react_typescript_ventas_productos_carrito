
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './menu';
import rutas from './route.config';
import ConfiguraValidaciones from './ConfigurarValidaciones';

ConfiguraValidaciones();

function App() {
  return (
    <>
    <BrowserRouter>
     

        <Menu />
        <div className='container'>
          <Routes>
            {rutas.map(ruta =>
              <Route
                key={ruta.path}
                path={ruta.path}
                element={
                  
                     <ruta.componente />
                }
              />
            )}
          </Routes>
        </div>

      
    </BrowserRouter>


  </>
  );
}

export default App;
