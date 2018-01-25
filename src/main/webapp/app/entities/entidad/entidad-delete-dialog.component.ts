import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { EntidadPopupService } from './entidad-popup.service';
import { EntidadService } from './entidad.service';

@Component({
    selector: 'jhi-entidad-delete-dialog',
    templateUrl: './entidad-delete-dialog.component.html'
})
export class EntidadDeleteDialogComponent {

    entidad: Entidad;

    constructor(
        private entidadService: EntidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entidadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entidadListModification',
                content: 'Deleted an entidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entidad-delete-popup',
    template: ''
})
export class EntidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entidadPopupService: EntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.entidadPopupService
                .open(EntidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
