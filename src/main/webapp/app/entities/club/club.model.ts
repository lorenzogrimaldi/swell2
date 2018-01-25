import { BaseEntity } from './../../shared';

export class Club implements BaseEntity {
    constructor(
        public id?: number,
        public fundacion?: any,
        public entidad?: BaseEntity,
    ) {
    }
}
