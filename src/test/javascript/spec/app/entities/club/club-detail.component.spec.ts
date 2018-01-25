/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Swell2TestModule } from '../../../test.module';
import { ClubDetailComponent } from '../../../../../../main/webapp/app/entities/club/club-detail.component';
import { ClubService } from '../../../../../../main/webapp/app/entities/club/club.service';
import { Club } from '../../../../../../main/webapp/app/entities/club/club.model';

describe('Component Tests', () => {

    describe('Club Management Detail Component', () => {
        let comp: ClubDetailComponent;
        let fixture: ComponentFixture<ClubDetailComponent>;
        let service: ClubService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Swell2TestModule],
                declarations: [ClubDetailComponent],
                providers: [
                    ClubService
                ]
            })
            .overrideTemplate(ClubDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClubDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClubService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Club(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.club).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
