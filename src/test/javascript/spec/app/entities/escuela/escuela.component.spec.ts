/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Swell2TestModule } from '../../../test.module';
import { EscuelaComponent } from '../../../../../../main/webapp/app/entities/escuela/escuela.component';
import { EscuelaService } from '../../../../../../main/webapp/app/entities/escuela/escuela.service';
import { Escuela } from '../../../../../../main/webapp/app/entities/escuela/escuela.model';

describe('Component Tests', () => {

    describe('Escuela Management Component', () => {
        let comp: EscuelaComponent;
        let fixture: ComponentFixture<EscuelaComponent>;
        let service: EscuelaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EscuelaComponent],
                providers: [
                    EscuelaService
                ]
            })
            .overrideTemplate(EscuelaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscuelaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscuelaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Escuela(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.escuelas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
