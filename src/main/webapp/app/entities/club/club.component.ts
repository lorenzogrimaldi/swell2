import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Club } from './club.model';
import { ClubService } from './club.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-club',
    templateUrl: './club.component.html'
})
export class ClubComponent implements OnInit, OnDestroy {
clubs: Club[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clubService: ClubService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clubService.query().subscribe(
            (res: ResponseWrapper) => {
                this.clubs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClubs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Club) {
        return item.id;
    }
    registerChangeInClubs() {
        this.eventSubscriber = this.eventManager.subscribe('clubListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
