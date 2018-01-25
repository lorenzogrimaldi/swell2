/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Swell2TestModule } from '../../../test.module';
import { EntrenadorComponent } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.component';
import { EntrenadorService } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.service';
import { Entrenador } from '../../../../../../main/webapp/app/entities/entrenador/entrenador.model';

describe('Component Tests', () => {

    describe('Entrenador Management Component', () => {
        let comp: EntrenadorComponent;
        let fixture: ComponentFixture<EntrenadorComponent>;
        let service: EntrenadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [EntrenadorComponent],
                providers: [
                    EntrenadorService
                ]
            })
            .overrideTemplate(EntrenadorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntrenadorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntrenadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Entrenador(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entrenadors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
