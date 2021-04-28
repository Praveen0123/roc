import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromInstitutions from './institutions.reducer';
import { InstitutionsEffects } from './institutions.effects';
import { InstitutionsFacade } from './institutions.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromInstitutions.INSTITUTIONS_FEATURE_KEY,
      fromInstitutions.reducer
    ),
    EffectsModule.forFeature([InstitutionsEffects])
  ],
  providers: [InstitutionsFacade]
})
export class InstitutionsStateModule {}
