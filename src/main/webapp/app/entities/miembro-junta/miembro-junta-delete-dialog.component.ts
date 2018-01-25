import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Miembro_junta } from './miembro-junta.model';
import { Miembro_juntaPopupService } from './miembro-junta-popup.service';
import { Miembro_juntaService } from './miembro-junta.service';

@Component({
    selector: 'jhi-miembro-junta-delete-dialog',
    templateUrl: './miembro-junta-delete-dialog.component.html'
})
export class Miembro_juntaDeleteDialogComponent {

    miembro_junta: Miembro_junta;

    constructor(
        private miembro_juntaService: Miembro_juntaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.miembro_juntaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'miembro_juntaListModification',
                content: 'Deleted an miembro_junta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-miembro-junta-delete-popup',
    template: ''
})
export class Miembro_juntaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private miembro_juntaPopupService: Miembro_juntaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.miembro_juntaPopupService
                .open(Miembro_juntaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
