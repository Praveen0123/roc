import { RoiCalculatorOutputQueryVariables } from '@gql';
import { createAction, props } from '@ngrx/store';
import { RoiCalculatorOutputsEntity } from './roi-calculator-outputs.models';

export const getRoiCalculatorOutput = createAction(
  '[RoiCalculatorOutputs] Get RoiCalculatorOutput',
  props<{ roiCalculatorInputs: RoiCalculatorOutputQueryVariables }>()
);

export const updateSelectedId = createAction(
  '[RoiCalculatorOutputs] Update Selected ID',
  props<{ selectedId: string }>()
);

export const loadRoiCalculatorOutput = createAction(
  '[RoiCalculatorOutputs] Load RoiCalculatorOutput',
  props<{ roiCalculatorInputs: RoiCalculatorOutputQueryVariables }>()
);

export const loadRoiCalculatorOutputSuccess = createAction(
  '[RoiCalculatorOutputs] Load RoiCalculatorOutput Success',
  props<{ roiCalculatorOutput: RoiCalculatorOutputsEntity }>()
);

export const loadRoiCalculatorOutputFailure = createAction(
  '[RoiCalculatorOutputs] Load RoiCalculatorOutput Failure',
  props<{ error: any }>()
);
