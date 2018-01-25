import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Miembro_junta } from './miembro-junta.model';
import { Miembro_juntaPopupService } from './miembro-junta-popup.service';
import { Miembro_juntaService } from './miembro-junta.service';
import { Persona, PersonaService } from '../persona';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-miembro-junta-dialog',
    templateUrl: './miembro-junta-dialog.component.html'
})
export class Miembro_juntaDialogComponent implements OnInit {

    miembro_junta: Miembro_junta;
    isSaving: boolean;

    personas: Persona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private miembro_juntaService: Miembro_juntaService,
        private personaService: PersonaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService
            .query({filter: 'miembro_junta-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.miembro_junta.persona || !this.miembro_junta.persona.id) {
                    this.personas = res.json;
                } else {
                    this.personaService
                        .find(this.miembro_junta.persona.id)
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
        if (this.miembro_junta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.miembro_juntaService.update(this.miembro_junta));
        } else {
            this.subscribeToSaveResponse(
                this.miembro_juntaService.create(this.miembro_junta));
        }
    }

    private subscribeToSaveResponse(result: Observable<Miembro_junta>) {
        result.subscribe((res: Miembro_junta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Miembro_junta) {
        this.eventManager.broadcast({ name: 'miembro_juntaListModification', content: 'OK'});
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
    selector: 'jhi-miembro-junta-popup',
    template: ''
})
export class Miembro_juntaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private miembro_juntaPopupService: Miembro_juntaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.miembro_juntaPopupService
                    .open(Miembro_juntaDialogComponent as Component, params['id']);
            } else {
                this.miembro_juntaPopupService
                    .open(Miembro_juntaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
