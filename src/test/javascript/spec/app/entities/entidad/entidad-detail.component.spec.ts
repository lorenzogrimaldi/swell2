/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { EntidadDetailComponent } from '../../../../../../main/webapp/app/entities/entidad/entidad-detail.component';
import { EntidadService } from '../../../../../../main/webapp/app/entities/entidad/entidad.service';
import { Entidad } from '../../../../../../main/webapp/app/entities/entidad/entidad.model';

describe('Component Tests', () => {

    describe('Entidad Management Detail Component', () => {
        let comp: EntidadDetailComponent;
        let fixture: ComponentFixture<EntidadDetailComponent>;
        let service: EntidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EntidadDetailComponent],
                providers: [
                    EntidadService
                ]
            })
            .overrideTemplate(EntidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Entidad(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entidad).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
