import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EscuelaComponent } from './escuela.component';
import { EscuelaDetailComponent } from './escuela-detail.component';
import { EscuelaPopupComponent } from './escuela-dialog.component';
import { EscuelaDeletePopupComponent } from './escuela-delete-dialog.component';

export const escuelaRoute: Routes = [
    {
        path: 'escuela',
        component: EscuelaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Escuelas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'escuela/:id',
        component: EscuelaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Escuelas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const escuelaPopupRoute: Routes = [
    {
        path: 'escuela-new',
        component: EscuelaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Escuelas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escuela/:id/edit',
        component: EscuelaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Escuelas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escuela/:id/delete',
        component: EscuelaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Escuelas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
