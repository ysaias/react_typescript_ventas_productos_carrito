import { CategoriaDto } from "../categoria/categoria.model";

export interface LandingPageDTO{
    productos?: Producto[];
}

export interface productoDTO{
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    categoriaId: number;  
    imagenUrl?: string; 
    createdAt?: string;
}

export interface CreacionProductoDTO{
    
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    categoriaId: number;  
    imagenUrl?: File | null;
    imagenCargar?: string;
}

export interface CategoriasPostGetDTO{
    categorias: CategoriaDto[];
}

export interface CategoriasPutGetDTO{
    producto: productoDTO;
    categoriasNoSeleccionados: generoDTO[];
}