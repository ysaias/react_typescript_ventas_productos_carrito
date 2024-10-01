import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css'; // Importa como styles para un CSS Module


export default function Menu() {
  


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className={({ isActive }) => isActive ? `navbar-brand ${styles.active}` : 'navbar-brand'} >
          Venta Productos
        </NavLink>

        <div className="collapse navbar-collapse" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to="/productos/filtrar" className={({ isActive }) => isActive ? `nav-link ${styles.active}` : 'nav-link'}>
                Filtrar Productos
              </NavLink>
            </li>
            <li className="nav-item">
                    <NavLink to="/productos/crear" className={({ isActive }) => isActive ? `nav-link ${styles.active}` : 'nav-link'}>
                      Crear Prodcutos
                    </NavLink>
                  </li>
           

          </ul>

          
          
         
        </div>
      </div>
    </nav>
  );
}
