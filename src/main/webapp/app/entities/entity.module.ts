import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Swell2PersonaModule } from './persona/persona.module';
import { Swell2JuezModule } from './juez/juez.module';
import { Swell2Miembro_juntaModule } from './miembro-junta/miembro-junta.module';
import { Swell2EntrenadorModule } from './entrenador/entrenador.module';
import { Swell2EntidadModule } from './entidad/entidad.module';
import { Swell2EscuelaModule } from './escuela/escuela.module';
import { Swell2ClubModule } from './club/club.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Swell2PersonaModule,
        Swell2JuezModule,
        Swell2Miembro_juntaModule,
        Swell2EntrenadorModule,
        Swell2EntidadModule,
        Swell2EscuelaModule,
        Swell2ClubModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2EntityModule {}
