/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Swell2TestModule } from '../../../test.module';
import { JuezComponent } from '../../../../../../main/webapp/app/entities/juez/juez.component';
import { JuezService } from '../../../../../../main/webapp/app/entities/juez/juez.service';
import { Juez } from '../../../../../../main/webapp/app/entities/juez/juez.model';

describe('Component Tests', () => {

    describe('Juez Management Component', () => {
        let comp: JuezComponent;
        let fixture: ComponentFixture<JuezComponent>;
        let service: JuezService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [JuezComponent],
                providers: [
                    JuezService
                ]
            })
            .overrideTemplate(JuezComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JuezComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JuezService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Juez(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.juezs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
