/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Swell2TestModule } from '../../../test.module';
import { Miembro_juntaComponent } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.component';
import { Miembro_juntaService } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.service';
import { Miembro_junta } from '../../../../../../main/webapp/app/entities/miembro-junta/miembro-junta.model';

describe('Component Tests', () => {

    describe('Miembro_junta Management Component', () => {
        let comp: Miembro_juntaComponent;
        let fixture: ComponentFixture<Miembro_juntaComponent>;
        let service: Miembro_juntaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [Miembro_juntaComponent],
                providers: [
                    Miembro_juntaService
                ]
            })
            .overrideTemplate(Miembro_juntaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Miembro_juntaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Miembro_juntaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Miembro_junta(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.miembro_juntas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
