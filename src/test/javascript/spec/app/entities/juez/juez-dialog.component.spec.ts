/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Swell2TestModule } from '../../../test.module';
import { JuezDialogComponent } from '../../../../../../main/webapp/app/entities/juez/juez-dialog.component';
import { JuezService } from '../../../../../../main/webapp/app/entities/juez/juez.service';
import { Juez } from '../../../../../../main/webapp/app/entities/juez/juez.model';
import { PersonaService } from '../../../../../../main/webapp/app/entities/persona';

describe('Component Tests', () => {

    describe('Juez Management Dialog Component', () => {
        let comp: JuezDialogComponent;
        let fixture: ComponentFixture<JuezDialogComponent>;
        let service: JuezService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [JuezDialogComponent],
                providers: [
                    PersonaService,
                    JuezService
                ]
            })
            .overrideTemplate(JuezDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JuezDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JuezService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Juez(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.juez = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'juezListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Juez();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.juez = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'juezListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
