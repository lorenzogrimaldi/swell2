import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entrenador } from './entrenador.model';
import { EntrenadorService } from './entrenador.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entrenador',
    templateUrl: './entrenador.component.html'
})
export class EntrenadorComponent implements OnInit, OnDestroy {
entrenadors: Entrenador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entrenadorService: EntrenadorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entrenadorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entrenadors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntrenadors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Entrenador) {
        return item.id;
    }
    registerChangeInEntrenadors() {
        this.eventSubscriber = this.eventManager.subscribe('entrenadorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
