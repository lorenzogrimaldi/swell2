/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Swell2TestModule } from '../../../test.module';
import { PersonaDialogComponent } from '../../../../../../main/webapp/app/entities/persona/persona-dialog.component';
import { PersonaService } from '../../../../../../main/webapp/app/entities/persona/persona.service';
import { Persona } from '../../../../../../main/webapp/app/entities/persona/persona.model';

describe('Component Tests', () => {

    describe('Persona Management Dialog Component', () => {
        let comp: PersonaDialogComponent;
        let fixture: ComponentFixture<PersonaDialogComponent>;
        let service: PersonaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [PersonaDialogComponent],
                providers: [
                    PersonaService
                ]
            })
            .overrideTemplate(PersonaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Persona(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.persona = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Persona();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.persona = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
