import { BaseEntity } from './../../shared';

export class Miembro_junta implements BaseEntity {
    constructor(
        public id?: number,
        public niveljerarquia?: string,
        public persona?: BaseEntity,
    ) {
    }
}
