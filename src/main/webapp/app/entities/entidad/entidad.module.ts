import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    EntidadService,
    EntidadPopupService,
    EntidadComponent,
    EntidadDetailComponent,
    EntidadDialogComponent,
    EntidadPopupComponent,
    EntidadDeletePopupComponent,
    EntidadDeleteDialogComponent,
    entidadRoute,
    entidadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entidadRoute,
    ...entidadPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntidadComponent,
        EntidadDetailComponent,
        EntidadDialogComponent,
        EntidadDeleteDialogComponent,
        EntidadPopupComponent,
        EntidadDeletePopupComponent,
    ],
    entryComponents: [
        EntidadComponent,
        EntidadDialogComponent,
        EntidadPopupComponent,
        EntidadDeleteDialogComponent,
        EntidadDeletePopupComponent,
    ],
    providers: [
        EntidadService,
        EntidadPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2EntidadModule {}
