import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoiCalculatorOutputs from './roi-calculator-outputs.reducer';
import { RoiCalculatorOutputsEffects } from './roi-calculator-outputs.effects';
import { RoiCalculatorOutputsFacade } from './roi-calculator-outputs.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromRoiCalculatorOutputs.ROI_CALCULATOR_OUTPUTS_FEATURE_KEY,
      fromRoiCalculatorOutputs.reducer
    ),
    EffectsModule.forFeature([RoiCalculatorOutputsEffects])
  ],
  providers: [RoiCalculatorOutputsFacade]
})
export class RoiCalculatorOutputsStateModule {}
