import { RoiCalculatorOutput, RoiCalculatorOutputQueryVariables } from '@gql';

/**
 * Interface for the 'RoiCalculatorOutputs' data
 */
export interface RoiCalculatorOutputsEntity {
  // inputs
  roiCalculatorInputs: RoiCalculatorOutputQueryVariables;

  // outputs
  goalState: RoiCalculatorOutput;
  currentState: RoiCalculatorOutput;
}
