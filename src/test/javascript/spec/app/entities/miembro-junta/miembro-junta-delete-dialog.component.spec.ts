/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Swell2TestModule } from '../../../test.module';
import { Miembro_juntaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta-delete-dialog.component';
import { Miembro_juntaService } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.service';

describe('Component Tests', () => {

    describe('Miembro_junta Management Delete Component', () => {
        let comp: Miembro_juntaDeleteDialogComponent;
        let fixture: ComponentFixture<Miembro_juntaDeleteDialogComponent>;
        let service: Miembro_juntaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [Miembro_juntaDeleteDialogComponent],
                providers: [
                    Miembro_juntaService
                ]
            })
            .overrideTemplate(Miembro_juntaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Miembro_juntaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Miembro_juntaService);
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
