/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { Miembro_juntaDetailComponent } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta-detail.component';
import { Miembro_juntaService } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.service';
import { Miembro_junta } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.model';

describe('Component Tests', () => {

    describe('Miembro_junta Management Detail Component', () => {
        let comp: Miembro_juntaDetailComponent;
        let fixture: ComponentFixture<Miembro_juntaDetailComponent>;
        let service: Miembro_juntaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [Miembro_juntaDetailComponent],
                providers: [
                    Miembro_juntaService
                ]
            })
            .overrideTemplate(Miembro_juntaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Miembro_juntaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Miembro_juntaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Miembro_junta(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.miembro_junta).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
