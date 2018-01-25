/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Swell2TestModule } from '../../../test.module';
import { EntrenadorDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entrenador/entrenador-delete-dialog.component';
import { EntrenadorService } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.service';

describe('Component Tests', () => {

    describe('Entrenador Management Delete Component', () => {
        let comp: EntrenadorDeleteDialogComponent;
        let fixture: ComponentFixture<EntrenadorDeleteDialogComponent>;
        let service: EntrenadorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EntrenadorDeleteDialogComponent],
                providers: [
                    EntrenadorService
                ]
            })
            .overrideTemplate(EntrenadorDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntrenadorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntrenadorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
