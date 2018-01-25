import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Escuela } from './escuela.model';
import { EscuelaPopupService } from './escuela-popup.service';
import { EscuelaService } from './escuela.service';
import { Entidad, EntidadService } from '../entidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-escuela-dialog',
    templateUrl: './escuela-dialog.component.html'
})
export class EscuelaDialogComponent implements OnInit {

    escuela: Escuela;
    isSaving: boolean;

    entidads: Entidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private escuelaService: EscuelaService,
        private entidadService: EntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entidadService
            .query({filter: 'escuela-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.escuela.entidad || !this.escuela.entidad.id) {
                    this.entidads = res.json;
                } else {
                    this.entidadService
                        .find(this.escuela.entidad.id)
                        .subscribe((subRes: Entidad) => {
                            this.entidads = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.escuela.id !== undefined) {
            this.subscribeToSaveResponse(
                this.escuelaService.update(this.escuela));
        } else {
            this.subscribeToSaveResponse(
                this.escuelaService.create(this.escuela));
        }
    }

    private subscribeToSaveResponse(result: Observable<Escuela>) {
        result.subscribe((res: Escuela) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Escuela) {
        this.eventManager.broadcast({ name: 'escuelaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntidadById(index: number, item: Entidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-escuela-popup',
    template: ''
})
export class EscuelaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escuelaPopupService: EscuelaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.escuelaPopupService
                    .open(EscuelaDialogComponent as Component, params['id']);
            } else {
                this.escuelaPopupService
                    .open(EscuelaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
