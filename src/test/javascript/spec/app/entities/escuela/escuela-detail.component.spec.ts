/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { EscuelaDetailComponent } from '../../../../../../main/webapp/app/entities/escuela/escuela-detail.component';
import { EscuelaService } from '../../../../../../main/webapp/app/entities/escuela/escuela.service';
import { Escuela } from '../../../../../../main/webapp/app/entities/escuela/escuela.model';

describe('Component Tests', () => {

    describe('Escuela Management Detail Component', () => {
        let comp: EscuelaDetailComponent;
        let fixture: ComponentFixture<EscuelaDetailComponent>;
        let service: EscuelaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EscuelaDetailComponent],
                providers: [
                    EscuelaService
                ]
            })
            .overrideTemplate(EscuelaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscuelaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscuelaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Escuela(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.escuela).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
