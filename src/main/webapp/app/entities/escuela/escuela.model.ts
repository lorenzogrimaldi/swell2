import { BaseEntity } from './../../shared';

export class Escuela implements BaseEntity {
    constructor(
        public id?: number,
        public fundacion?: any,
        public entidad?: BaseEntity,
    ) {
    }
}
