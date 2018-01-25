import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    EntrenadorService,
    EntrenadorPopupService,
    EntrenadorComponent,
    EntrenadorDetailComponent,
    EntrenadorDialogComponent,
    EntrenadorPopupComponent,
    EntrenadorDeletePopupComponent,
    EntrenadorDeleteDialogComponent,
    entrenadorRoute,
    entrenadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entrenadorRoute,
    ...entrenadorPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntrenadorComponent,
        EntrenadorDetailComponent,
        EntrenadorDialogComponent,
        EntrenadorDeleteDialogComponent,
        EntrenadorPopupComponent,
        EntrenadorDeletePopupComponent,
    ],
    entryComponents: [
        EntrenadorComponent,
        EntrenadorDialogComponent,
        EntrenadorPopupComponent,
        EntrenadorDeleteDialogComponent,
        EntrenadorDeletePopupComponent,
    ],
    providers: [
        EntrenadorService,
        EntrenadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2EntrenadorModule {}
