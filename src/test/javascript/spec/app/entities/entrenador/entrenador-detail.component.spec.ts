/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { EntrenadorDetailComponent } from '../../../../../../main/webapp/app/entities/entrenador/entrenador-detail.component';
import { EntrenadorService } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.service';
import { Entrenador } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.model';

describe('Component Tests', () => {

    describe('Entrenador Management Detail Component', () => {
        let comp: EntrenadorDetailComponent;
        let fixture: ComponentFixture<EntrenadorDetailComponent>;
        let service: EntrenadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EntrenadorDetailComponent],
                providers: [
                    EntrenadorService
                ]
            })
            .overrideTemplate(EntrenadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntrenadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntrenadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Entrenador(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entrenador).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
