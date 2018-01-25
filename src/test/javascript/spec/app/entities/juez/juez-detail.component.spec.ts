/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { JuezDetailComponent } from '../../../../../../main/webapp/app/entities/juez/juez-detail.component';
import { JuezService } from '../../../../../../main/webapp/app/entities/juez/juez.service';
import { Juez } from '../../../../../../main/webapp/app/entities/juez/juez.model';

describe('Component Tests', () => {

    describe('Juez Management Detail Component', () => {
        let comp: JuezDetailComponent;
        let fixture: ComponentFixture<JuezDetailComponent>;
        let service: JuezService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [JuezDetailComponent],
                providers: [
                    JuezService
                ]
            })
            .overrideTemplate(JuezDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JuezDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JuezService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Juez(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.juez).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
