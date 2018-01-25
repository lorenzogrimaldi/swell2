import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JuezComponent } from './juez.component';
import { JuezDetailComponent } from './juez-detail.component';
import { JuezPopupComponent } from './juez-dialog.component';
import { JuezDeletePopupComponent } from './juez-delete-dialog.component';

export const juezRoute: Routes = [
    {
        path: 'juez',
        component: JuezComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Juezs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'juez/:id',
        component: JuezDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Juezs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const juezPopupRoute: Routes = [
    {
        path: 'juez-new',
        component: JuezPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Juezs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'juez/:id/edit',
        component: JuezPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Juezs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'juez/:id/delete',
        component: JuezDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Juezs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
