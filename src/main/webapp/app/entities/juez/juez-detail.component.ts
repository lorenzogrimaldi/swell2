import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Juez } from './juez.model';
import { JuezService } from './juez.service';

@Component({
    selector: 'jhi-juez-detail',
    templateUrl: './juez-detail.component.html'
})
export class JuezDetailComponent implements OnInit, OnDestroy {

    juez: Juez;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private juezService: JuezService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJuezs();
    }

    load(id) {
        this.juezService.find(id).subscribe((juez) => {
            this.juez = juez;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJuezs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'juezListModification',
            (response) => this.load(this.juez.id)
        );
    }
}
