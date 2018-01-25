import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Juez } from './juez.model';
import { JuezPopupService } from './juez-popup.service';
import { JuezService } from './juez.service';
import { Persona, PersonaService } from '../persona';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-juez-dialog',
    templateUrl: './juez-dialog.component.html'
})
export class JuezDialogComponent implements OnInit {

    juez: Juez;
    isSaving: boolean;

    personas: Persona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private juezService: JuezService,
        private personaService: PersonaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService
            .query({filter: 'juez-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.juez.persona || !this.juez.persona.id) {
                    this.personas = res.json;
                } else {
                    this.personaService
                        .find(this.juez.persona.id)
                        .subscribe((subRes: Persona) => {
                            this.personas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.juez.id !== undefined) {
            this.subscribeToSaveResponse(
                this.juezService.update(this.juez));
        } else {
            this.subscribeToSaveResponse(
                this.juezService.create(this.juez));
        }
    }

    private subscribeToSaveResponse(result: Observable<Juez>) {
        result.subscribe((res: Juez) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Juez) {
        this.eventManager.broadcast({ name: 'juezListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonaById(index: number, item: Persona) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-juez-popup',
    template: ''
})
export class JuezPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private juezPopupService: JuezPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.juezPopupService
                    .open(JuezDialogComponent as Component, params['id']);
            } else {
                this.juezPopupService
                    .open(JuezDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
