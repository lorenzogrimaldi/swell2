import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Entrenador } from './entrenador.model';
import { EntrenadorService } from './entrenador.service';

@Component({
    selector: 'jhi-entrenador-detail',
    templateUrl: './entrenador-detail.component.html'
})
export class EntrenadorDetailComponent implements OnInit, OnDestroy {

    entrenador: Entrenador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entrenadorService: EntrenadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntrenadors();
    }

    load(id) {
        this.entrenadorService.find(id).subscribe((entrenador) => {
            this.entrenador = entrenador;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntrenadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entrenadorListModification',
            (response) => this.load(this.entrenador.id)
        );
    }
}
