import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { EntidadService } from './entidad.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entidad',
    templateUrl: './entidad.component.html'
})
export class EntidadComponent implements OnInit, OnDestroy {
entidads: Entidad[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entidadService: EntidadService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entidadService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entidads = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Entidad) {
        return item.id;
    }
    registerChangeInEntidads() {
        this.eventSubscriber = this.eventManager.subscribe('entidadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
