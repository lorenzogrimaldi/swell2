import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClubComponent } from './club.component';
import { ClubDetailComponent } from './club-detail.component';
import { ClubPopupComponent } from './club-dialog.component';
import { ClubDeletePopupComponent } from './club-delete-dialog.component';

export const clubRoute: Routes = [
    {
        path: 'club',
        component: ClubComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clubs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'club/:id',
        component: ClubDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clubs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clubPopupRoute: Routes = [
    {
        path: 'club-new',
        component: ClubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clubs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'club/:id/edit',
        component: ClubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clubs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'club/:id/delete',
        component: ClubDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clubs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
