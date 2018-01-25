import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Miembro_juntaComponent } from './miembro-junta.component';
import { Miembro_juntaDetailComponent } from './miembro-junta-detail.component';
import { Miembro_juntaPopupComponent } from './miembro-junta-dialog.component';
import { Miembro_juntaDeletePopupComponent } from './miembro-junta-delete-dialog.component';

export const miembro_juntaRoute: Routes = [
    {
        path: 'miembro-junta',
        component: Miembro_juntaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Miembro_juntas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'miembro-junta/:id',
        component: Miembro_juntaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Miembro_juntas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const miembro_juntaPopupRoute: Routes = [
    {
        path: 'miembro-junta-new',
        component: Miembro_juntaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Miembro_juntas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'miembro-junta/:id/edit',
        component: Miembro_juntaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Miembro_juntas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'miembro-junta/:id/delete',
        component: Miembro_juntaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Miembro_juntas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
