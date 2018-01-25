import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Escuela } from './escuela.model';
import { EscuelaService } from './escuela.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-escuela',
    templateUrl: './escuela.component.html'
})
export class EscuelaComponent implements OnInit, OnDestroy {
escuelas: Escuela[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private escuelaService: EscuelaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.escuelaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.escuelas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEscuelas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Escuela) {
        return item.id;
    }
    registerChangeInEscuelas() {
        this.eventSubscriber = this.eventManager.subscribe('escuelaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
