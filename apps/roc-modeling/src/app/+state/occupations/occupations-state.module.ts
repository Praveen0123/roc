import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOccupations from './occupations.reducer';
import { OccupationsEffects } from './occupations.effects';
import { OccupationsFacade } from './occupations.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromOccupations.OCCUPATIONS_FEATURE_KEY,
      fromOccupations.reducer
    ),
    EffectsModule.forFeature([OccupationsEffects])
  ],
  providers: [OccupationsFacade]
})
export class OccupationsStateModule {}
