import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Miembro_junta } from './miembro-junta.model';
import { Miembro_juntaService } from './miembro-junta.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-miembro-junta',
    templateUrl: './miembro-junta.component.html'
})
export class Miembro_juntaComponent implements OnInit, OnDestroy {
miembro_juntas: Miembro_junta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private miembro_juntaService: Miembro_juntaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.miembro_juntaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.miembro_juntas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMiembro_juntas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Miembro_junta) {
        return item.id;
    }
    registerChangeInMiembro_juntas() {
        this.eventSubscriber = this.eventManager.subscribe('miembro_juntaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
