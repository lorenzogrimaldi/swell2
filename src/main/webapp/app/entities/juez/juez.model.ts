import { BaseEntity } from './../../shared';

export class Juez implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public persona?: BaseEntity,
    ) {
    }
}
