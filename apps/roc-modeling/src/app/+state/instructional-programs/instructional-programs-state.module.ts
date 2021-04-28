import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromInstructionalPrograms from './instructional-programs.reducer';
import { InstructionalProgramsEffects } from './instructional-programs.effects';
import { InstructionalProgramsFacade } from './instructional-programs.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromInstructionalPrograms.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY,
      fromInstructionalPrograms.reducer
    ),
    EffectsModule.forFeature([InstructionalProgramsEffects])
  ],
  providers: [InstructionalProgramsFacade]
})
export class InstructionalProgramsStateModule {}
