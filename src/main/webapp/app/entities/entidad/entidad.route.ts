import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntidadComponent } from './entidad.component';
import { EntidadDetailComponent } from './entidad-detail.component';
import { EntidadPopupComponent } from './entidad-dialog.component';
import { EntidadDeletePopupComponent } from './entidad-delete-dialog.component';

export const entidadRoute: Routes = [
    {
        path: 'entidad',
        component: EntidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entidad/:id',
        component: EntidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entidadPopupRoute: Routes = [
    {
        path: 'entidad-new',
        component: EntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidad/:id/edit',
        component: EntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidad/:id/delete',
        component: EntidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
