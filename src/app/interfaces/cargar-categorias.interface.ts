import { Categoria } from "../models/categoria.model";

export interface cargarCategorias {
    ok: boolean
    results: Categoria[]
    total: number

}