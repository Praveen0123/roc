import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AutoCompleteTextboxModule } from '@vantage-point/auto-complete-textbox';

import { CareerGoalsComponent } from './components/career-goals/career-goals.component';
import { CurrentInformationComponent } from './components/current-information/current-information.component';
import { EducationCostsComponent } from './components/education-costs/education-costs.component';
import { EducationFinancingComponent } from './components/education-financing/education-financing.component';
import { ModelingToolControlsComponent } from './components/modeling-tool-controls/modeling-tool-controls.component';
import { ModelingToolComponent } from './containers/modeling-tool/modeling-tool.component';
import { ModelingToolRoutingModule } from './modeling-tool-routing.module';
import { ModelingToolTitleComponent } from './components/modeling-tool-title/modeling-tool-title.component';
import { ExploreCareersComponent } from './components/explore-careers/explore-careers.component';
import { ExploreDegreesComponent } from './components/explore-degrees/explore-degrees.component';

@NgModule({
  imports:
    [
      CommonModule,
      AutoCompleteTextboxModule,
      ModelingToolRoutingModule,
      SharedModule
    ],
  declarations:
    [
      ModelingToolComponent,
      CurrentInformationComponent,
      CareerGoalsComponent,
      EducationCostsComponent,
      EducationFinancingComponent,
      ModelingToolControlsComponent,
      ModelingToolTitleComponent,
      ExploreCareersComponent,
      ExploreDegreesComponent
    ],
  exports:
    [
      ModelingToolComponent
    ]
})
export class ModelingToolModule { }
