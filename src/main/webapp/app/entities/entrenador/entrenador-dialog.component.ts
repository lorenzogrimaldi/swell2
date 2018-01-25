import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entrenador } from './entrenador.model';
import { EntrenadorPopupService } from './entrenador-popup.service';
import { EntrenadorService } from './entrenador.service';
import { Persona, PersonaService } from '../persona';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entrenador-dialog',
    templateUrl: './entrenador-dialog.component.html'
})
export class EntrenadorDialogComponent implements OnInit {

    entrenador: Entrenador;
    isSaving: boolean;

    personas: Persona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entrenadorService: EntrenadorService,
        private personaService: PersonaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService
            .query({filter: 'entrenador-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.entrenador.persona || !this.entrenador.persona.id) {
                    this.personas = res.json;
                } else {
                    this.personaService
                        .find(this.entrenador.persona.id)
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
        if (this.entrenador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entrenadorService.update(this.entrenador));
        } else {
            this.subscribeToSaveResponse(
                this.entrenadorService.create(this.entrenador));
        }
    }

    private subscribeToSaveResponse(result: Observable<Entrenador>) {
        result.subscribe((res: Entrenador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Entrenador) {
        this.eventManager.broadcast({ name: 'entrenadorListModification', content: 'OK'});
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
    selector: 'jhi-entrenador-popup',
    template: ''
})
export class EntrenadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entrenadorPopupService: EntrenadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entrenadorPopupService
                    .open(EntrenadorDialogComponent as Component, params['id']);
            } else {
                this.entrenadorPopupService
                    .open(EntrenadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
