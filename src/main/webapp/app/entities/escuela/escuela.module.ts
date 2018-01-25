import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    EscuelaService,
    EscuelaPopupService,
    EscuelaComponent,
    EscuelaDetailComponent,
    EscuelaDialogComponent,
    EscuelaPopupComponent,
    EscuelaDeletePopupComponent,
    EscuelaDeleteDialogComponent,
    escuelaRoute,
    escuelaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...escuelaRoute,
    ...escuelaPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EscuelaComponent,
        EscuelaDetailComponent,
        EscuelaDialogComponent,
        EscuelaDeleteDialogComponent,
        EscuelaPopupComponent,
        EscuelaDeletePopupComponent,
    ],
    entryComponents: [
        EscuelaComponent,
        EscuelaDialogComponent,
        EscuelaPopupComponent,
        EscuelaDeleteDialogComponent,
        EscuelaDeletePopupComponent,
    ],
    providers: [
        EscuelaService,
        EscuelaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2EscuelaModule {}
