import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Juez } from './juez.model';
import { JuezPopupService } from './juez-popup.service';
import { JuezService } from './juez.service';

@Component({
    selector: 'jhi-juez-delete-dialog',
    templateUrl: './juez-delete-dialog.component.html'
})
export class JuezDeleteDialogComponent {

    juez: Juez;

    constructor(
        private juezService: JuezService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.juezService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'juezListModification',
                content: 'Deleted an juez'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-juez-delete-popup',
    template: ''
})
export class JuezDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private juezPopupService: JuezPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.juezPopupService
                .open(JuezDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
