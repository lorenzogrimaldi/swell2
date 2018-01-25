import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Escuela } from './escuela.model';
import { EscuelaService } from './escuela.service';

@Component({
    selector: 'jhi-escuela-detail',
    templateUrl: './escuela-detail.component.html'
})
export class EscuelaDetailComponent implements OnInit, OnDestroy {

    escuela: Escuela;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private escuelaService: EscuelaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEscuelas();
    }

    load(id) {
        this.escuelaService.find(id).subscribe((escuela) => {
            this.escuela = escuela;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEscuelas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'escuelaListModification',
            (response) => this.load(this.escuela.id)
        );
    }
}
