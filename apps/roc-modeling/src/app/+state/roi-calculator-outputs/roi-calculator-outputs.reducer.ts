import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RoiCalculatorOutputsActions from './roi-calculator-outputs.actions';
import { RoiCalculatorOutputsEntity } from './roi-calculator-outputs.models';
import { RoiCalculatorOutputQueryVariables } from '@gql';

export const ROI_CALCULATOR_OUTPUTS_FEATURE_KEY = 'roiCalculatorOutputs';

export interface State extends EntityState<RoiCalculatorOutputsEntity> {
  selectedId?: string; // which RoiCalculatorOutputs record has been selected
  error?: string | null; // last known error (if any)
  loading: boolean;
}

export interface RoiCalculatorOutputsPartialState {
  readonly [ROI_CALCULATOR_OUTPUTS_FEATURE_KEY]: State;
}

export function calculateIdFromInputs(
  roiCalculatorInputs: RoiCalculatorOutputQueryVariables
): string {
  return (
    roiCalculatorInputs.currentZipCode +
    '_' +
    roiCalculatorInputs.goalZipCode +
    '_' +
    roiCalculatorInputs.distance +
    '_' +
    roiCalculatorInputs.currentStateOnetCode?.join('-') +
    '_' +
    roiCalculatorInputs.goalStateOnetCode.join('-') +
    '_' +
    roiCalculatorInputs.startDegreeLevel +
    '_' +
    roiCalculatorInputs.endDegreeLevel +
    '_' +
    roiCalculatorInputs.yearsToRetirement +
    '_' +
    roiCalculatorInputs.avgNetPrice +
    '_' +
    roiCalculatorInputs.monthsToPayoffFederalLoan +
    '_' +
    roiCalculatorInputs.monthsToPayoffPrivateLoan +
    '_' +
    roiCalculatorInputs.annualExpenseFromSavings?.join('-')
  );
}

export const roiCalculatorOutputsAdapter: EntityAdapter<RoiCalculatorOutputsEntity> = createEntityAdapter<
  RoiCalculatorOutputsEntity
>({
  selectId: (roiCalculatorOutputsEntity: RoiCalculatorOutputsEntity) =>
    calculateIdFromInputs(roiCalculatorOutputsEntity.roiCalculatorInputs),
  sortComparer: false,
});

export const initialState: State = roiCalculatorOutputsAdapter.getInitialState({
  // set initial required properties
  selectedId: null,
  error: null,
  loading: false,
});

const roiCalculatorOutputsReducer = createReducer(
  initialState,
  on(RoiCalculatorOutputsActions.getRoiCalculatorOutput, (state) => ({
    ...state,
    error: null,
  })),
  on(RoiCalculatorOutputsActions.loadRoiCalculatorOutput, (state) => {
    return { ...state, loading: true };
  }),
  on(
    RoiCalculatorOutputsActions.loadRoiCalculatorOutputSuccess,
    (state, { roiCalculatorOutput }) => {
      return roiCalculatorOutputsAdapter.addOne(roiCalculatorOutput, {
        ...state,
        loading: false,
        selectedId: calculateIdFromInputs(
          roiCalculatorOutput.roiCalculatorInputs
        ),
        roiCalculatorInputs: { ...roiCalculatorOutput.roiCalculatorInputs },
      });
    }
  ),
  on(
    RoiCalculatorOutputsActions.loadRoiCalculatorOutputFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  ),
  on(RoiCalculatorOutputsActions.updateSelectedId, (state, { selectedId }) => ({
    ...state,
    loading: false,
    selectedId,
    roiCalculatorInputs: { ...state.entities[selectedId].roiCalculatorInputs },
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return roiCalculatorOutputsReducer(state, action);
}
