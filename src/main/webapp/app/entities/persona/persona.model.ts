import { BaseEntity } from './../../shared';

export class Persona implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public fechanacimiento?: any,
        public dui?: string,
        public nit?: string,
        public direccion?: string,
        public telefono?: string,
        public correo?: string,
    ) {
    }
}
