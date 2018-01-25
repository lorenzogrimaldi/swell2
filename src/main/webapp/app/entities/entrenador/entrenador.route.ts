import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntrenadorComponent } from './entrenador.component';
import { EntrenadorDetailComponent } from './entrenador-detail.component';
import { EntrenadorPopupComponent } from './entrenador-dialog.component';
import { EntrenadorDeletePopupComponent } from './entrenador-delete-dialog.component';

export const entrenadorRoute: Routes = [
    {
        path: 'entrenador',
        component: EntrenadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entrenadors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entrenador/:id',
        component: EntrenadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entrenadors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entrenadorPopupRoute: Routes = [
    {
        path: 'entrenador-new',
        component: EntrenadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entrenadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrenador/:id/edit',
        component: EntrenadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entrenadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrenador/:id/delete',
        component: EntrenadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entrenadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
