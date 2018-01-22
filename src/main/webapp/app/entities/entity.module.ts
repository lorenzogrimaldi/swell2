import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Swell2RegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { Swell2CountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { Swell2LocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { Swell2DepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { Swell2TaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { Swell2EmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { Swell2JobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { Swell2JobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Swell2RegionMySuffixModule,
        Swell2CountryMySuffixModule,
        Swell2LocationMySuffixModule,
        Swell2DepartmentMySuffixModule,
        Swell2TaskMySuffixModule,
        Swell2EmployeeMySuffixModule,
        Swell2JobMySuffixModule,
        Swell2JobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Swell2EntityModule {}
