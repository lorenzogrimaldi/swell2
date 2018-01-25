import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Miembro_junta } from './miembro-junta.model';
import { Miembro_juntaService } from './miembro-junta.service';

@Component({
    selector: 'jhi-miembro-junta-detail',
    templateUrl: './miembro-junta-detail.component.html'
})
export class Miembro_juntaDetailComponent implements OnInit, OnDestroy {

    miembro_junta: Miembro_junta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private miembro_juntaService: Miembro_juntaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMiembro_juntas();
    }

    load(id) {
        this.miembro_juntaService.find(id).subscribe((miembro_junta) => {
            this.miembro_junta = miembro_junta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMiembro_juntas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'miembro_juntaListModification',
            (response) => this.load(this.miembro_junta.id)
        );
    }
}
