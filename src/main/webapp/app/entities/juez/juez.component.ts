import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Juez } from './juez.model';
import { JuezService } from './juez.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-juez',
    templateUrl: './juez.component.html'
})
export class JuezComponent implements OnInit, OnDestroy {
juezs: Juez[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private juezService: JuezService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.juezService.query().subscribe(
            (res: ResponseWrapper) => {
                this.juezs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJuezs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Juez) {
        return item.id;
    }
    registerChangeInJuezs() {
        this.eventSubscriber = this.eventManager.subscribe('juezListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
