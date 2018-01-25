import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    JuezService,
    JuezPopupService,
    JuezComponent,
    JuezDetailComponent,
    JuezDialogComponent,
    JuezPopupComponent,
    JuezDeletePopupComponent,
    JuezDeleteDialogComponent,
    juezRoute,
    juezPopupRoute,
} from './';

const ENTITY_STATES = [
    ...juezRoute,
    ...juezPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JuezComponent,
        JuezDetailComponent,
        JuezDialogComponent,
        JuezDeleteDialogComponent,
        JuezPopupComponent,
        JuezDeletePopupComponent,
    ],
    entryComponents: [
        JuezComponent,
        JuezDialogComponent,
        JuezPopupComponent,
        JuezDeleteDialogComponent,
        JuezDeletePopupComponent,
    ],
    providers: [
        JuezService,
        JuezPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2JuezModule {}
