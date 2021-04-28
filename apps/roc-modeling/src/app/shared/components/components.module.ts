import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '../material/material.module';
import { LifetimeEarningsChartComponent } from './lifetime-earnings-chart/lifetime-earnings-chart.component';
import { SliderComponent } from './slider/slider.component';
import { LifetimeEarningsLegendComponent } from './lifetime-earnings-legend/lifetime-earnings-legend.component';
import { PipesModule } from '../pipes/pipes.module';
import { LifetimeEarningsPopoverComponent } from './lifetime-earnings-popover/lifetime-earnings-popover.component';
import { LifetimeEarningsComponent } from './lifetime-earnings/lifetime-earnings.component';

@NgModule({
  declarations: [
    LifetimeEarningsChartComponent,
    SliderComponent,
    LifetimeEarningsLegendComponent,
    LifetimeEarningsPopoverComponent,
    LifetimeEarningsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  exports: [
    LifetimeEarningsChartComponent,
    LifetimeEarningsLegendComponent,
    SliderComponent,
    LifetimeEarningsPopoverComponent,
    LifetimeEarningsComponent,
  ],
})
export class ComponentsModule {}
