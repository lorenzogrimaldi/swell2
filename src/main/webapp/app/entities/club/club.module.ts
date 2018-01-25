import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Swell2SharedModule } from '../../shared';
import {
    ClubService,
    ClubPopupService,
    ClubComponent,
    ClubDetailComponent,
    ClubDialogComponent,
    ClubPopupComponent,
    ClubDeletePopupComponent,
    ClubDeleteDialogComponent,
    clubRoute,
    clubPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clubRoute,
    ...clubPopupRoute,
];

@NgModule({
    imports: [
        Swell2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClubComponent,
        ClubDetailComponent,
        ClubDialogComponent,
        ClubDeleteDialogComponent,
        ClubPopupComponent,
        ClubDeletePopupComponent,
    ],
    entryComponents: [
        ClubComponent,
        ClubDialogComponent,
        ClubPopupComponent,
        ClubDeleteDialogComponent,
        ClubDeletePopupComponent,
    ],
    providers: [
        ClubService,
        ClubPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2ClubModule {}
