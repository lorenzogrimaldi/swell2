import { BaseEntity } from './../../shared';

export class Entrenador implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public persona?: BaseEntity,
    ) {
    }
}
