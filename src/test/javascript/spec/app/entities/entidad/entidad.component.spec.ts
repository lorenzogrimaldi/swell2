/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Swell2TestModule } from '../../../test.module';
import { EntidadComponent } from '../../../../../../main/webapp/app/entities/entidad/entidad.component';
import { EntidadService } from '../../../../../../main/webapp/app/entities/entidad/entidad.service';
import { Entidad } from '../../../../../../main/webapp/app/entities/entidad/entidad.model';

describe('Component Tests', () => {

    describe('Entidad Management Component', () => {
        let comp: EntidadComponent;
        let fixture: ComponentFixture<EntidadComponent>;
        let service: EntidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EntidadComponent],
                providers: [
                    EntidadService
                ]
            })
            .overrideTemplate(EntidadComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntidadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Entidad(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entidads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
