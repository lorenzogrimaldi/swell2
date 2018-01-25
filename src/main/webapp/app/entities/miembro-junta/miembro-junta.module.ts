import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    Miembro_juntaService,
    Miembro_juntaPopupService,
    Miembro_juntaComponent,
    Miembro_juntaDetailComponent,
    Miembro_juntaDialogComponent,
    Miembro_juntaPopupComponent,
    Miembro_juntaDeletePopupComponent,
    Miembro_juntaDeleteDialogComponent,
    miembro_juntaRoute,
    miembro_juntaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...miembro_juntaRoute,
    ...miembro_juntaPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Miembro_juntaComponent,
        Miembro_juntaDetailComponent,
        Miembro_juntaDialogComponent,
        Miembro_juntaDeleteDialogComponent,
        Miembro_juntaPopupComponent,
        Miembro_juntaDeletePopupComponent,
    ],
    entryComponents: [
        Miembro_juntaComponent,
        Miembro_juntaDialogComponent,
        Miembro_juntaPopupComponent,
        Miembro_juntaDeleteDialogComponent,
        Miembro_juntaDeletePopupComponent,
    ],
    providers: [
        Miembro_juntaService,
        Miembro_juntaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2Miembro_juntaModule {}
