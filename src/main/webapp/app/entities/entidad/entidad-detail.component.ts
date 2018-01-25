import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { EntidadService } from './entidad.service';

@Component({
    selector: 'jhi-entidad-detail',
    templateUrl: './entidad-detail.component.html'
})
export class EntidadDetailComponent implements OnInit, OnDestroy {

    entidad: Entidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entidadService: EntidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntidads();
    }

    load(id) {
        this.entidadService.find(id).subscribe((entidad) => {
            this.entidad = entidad;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entidadListModification',
            (response) => this.load(this.entidad.id)
        );
    }
}
