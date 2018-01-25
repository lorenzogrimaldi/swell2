import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Escuela } from './escuela.model';
import { EscuelaPopupService } from './escuela-popup.service';
import { EscuelaService } from './escuela.service';

@Component({
    selector: 'jhi-escuela-delete-dialog',
    templateUrl: './escuela-delete-dialog.component.html'
})
export class EscuelaDeleteDialogComponent {

    escuela: Escuela;

    constructor(
        private escuelaService: EscuelaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.escuelaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'escuelaListModification',
                content: 'Deleted an escuela'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-escuela-delete-popup',
    template: ''
})
export class EscuelaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escuelaPopupService: EscuelaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.escuelaPopupService
                .open(EscuelaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
