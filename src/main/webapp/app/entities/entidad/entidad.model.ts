import { BaseEntity } from './../../shared';

export class Entidad implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public representante?: string,
        public telefonofijo?: string,
        public correo?: string,
        public celular?: string,
        public direccion?: string,
        public telefono?: string,
    ) {
    }
}
