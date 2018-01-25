import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Club } from './club.model';
import { ClubPopupService } from './club-popup.service';
import { ClubService } from './club.service';
import { Entidad, EntidadService } from '../entidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-club-dialog',
    templateUrl: './club-dialog.component.html'
})
export class ClubDialogComponent implements OnInit {

    club: Club;
    isSaving: boolean;

    entidads: Entidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clubService: ClubService,
        private entidadService: EntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entidadService
            .query({filter: 'club-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.club.entidad || !this.club.entidad.id) {
                    this.entidads = res.json;
                } else {
                    this.entidadService
                        .find(this.club.entidad.id)
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
        if (this.club.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clubService.update(this.club));
        } else {
            this.subscribeToSaveResponse(
                this.clubService.create(this.club));
        }
    }

    private subscribeToSaveResponse(result: Observable<Club>) {
        result.subscribe((res: Club) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Club) {
        this.eventManager.broadcast({ name: 'clubListModification', content: 'OK'});
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
    selector: 'jhi-club-popup',
    template: ''
})
export class ClubPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clubPopupService: ClubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clubPopupService
                    .open(ClubDialogComponent as Component, params['id']);
            } else {
                this.clubPopupService
                    .open(ClubDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
