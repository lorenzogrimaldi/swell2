/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Swell2TestModule } from '../../../test.module';
import { Miembro_juntaDialogComponent } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta-dialog.component';
import { Miembro_juntaService } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.service';
import { Miembro_junta } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.model';
import { PersonaService } from '../../../../../../main/webapp/app/entities/persona';

describe('Component Tests', () => {

    describe('Miembro_junta Management Dialog Component', () => {
        let comp: Miembro_juntaDialogComponent;
        let fixture: ComponentFixture<Miembro_juntaDialogComponent>;
        let service: Miembro_juntaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [Miembro_juntaDialogComponent],
                providers: [
                    PersonaService,
                    Miembro_juntaService
                ]
            })
            .overrideTemplate(Miembro_juntaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Miembro_juntaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Miembro_juntaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Miembro_junta(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.miembro_junta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'miembro_juntaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Miembro_junta();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.miembro_junta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'miembro_juntaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
