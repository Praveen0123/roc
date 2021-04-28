import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoiCalculatorOutputsEntity } from './roi-calculator-outputs.models';
import
{
  ROI_CALCULATOR_OUTPUTS_FEATURE_KEY,
  State,
  RoiCalculatorOutputsPartialState,
  roiCalculatorOutputsAdapter,
} from './roi-calculator-outputs.reducer';
import
{
  PlotLayerValueSnapshot,
  RocChartPlotData,
  RocChartPlotMarker,
  RocChartPopoverData,
  RocLegendData,
  RocPlotsVisibility,
} from '@models/roc';

// Lookup the 'RoiCalculatorOutputs' feature state managed by NgRx
export const getRoiCalculatorOutputsState = createFeatureSelector<
  RoiCalculatorOutputsPartialState,
  State
>(ROI_CALCULATOR_OUTPUTS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
  selectIds,
} = roiCalculatorOutputsAdapter.getSelectors();

export const getRoiCalculatorOutputsError = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) => state.error
);

export const getRoiCalculatorOutputsLoading = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) => state.loading
);

export const getAllRoiCalculatorOutputs = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) => selectAll(state)
);

export const getRoiCalculatorOutputsEntities = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) => selectEntities(state)
);

export const getRoiCalculatorOutputsIds = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) => selectIds(state) as string[]
);

export const getSelectedEntity = createSelector(
  getRoiCalculatorOutputsState,
  (state: State) =>
  {
    return state.entities[state.selectedId];
  }
);

export const getRoiSectionsVisibility = createSelector(
  getRoiCalculatorOutputsState,
  getSelectedEntity,
  (_state: State, selectedEntity: RoiCalculatorOutputsEntity) =>
  {
    return {
      showCurrentState: selectedEntity?.currentState?.earningCumulativeProb50?.length ? true : false,
      showGoalState: selectedEntity?.roiCalculatorInputs?.goalStateOnetCode?.length ? true : false,
      // TODO: update with alumni data
      showAlumniData: false,
      showLoanAccumulation: selectedEntity?.roiCalculatorInputs?.avgNetPrice ? true : false,
      showLoanPayoff: selectedEntity?.goalState?.outOfPocket50?.[0] ? true : false,
    } as RocPlotsVisibility;
  }
);

export const getSelectedEntityChartPlotData = createSelector(
  getRoiCalculatorOutputsState,
  getSelectedEntity,
  getRoiSectionsVisibility,
  (
    _: State,
    entity: RoiCalculatorOutputsEntity,
    roiSectionsVisibility: RocPlotsVisibility
  ) =>
  {
    let rocChartPlotData: RocChartPlotData = null;

    if (roiSectionsVisibility.showCurrentState)
    {
      rocChartPlotData = {
        ...rocChartPlotData,
        currentState: {
          primaryColor: '#0866A0',
          secondaryColor: '#E2EDF3',
          secondaryColorOpacity: 1,
          values: entity.currentState.time.map(
            (t: number, i): PlotLayerValueSnapshot =>
            {
              return {
                time: t,
                earningsLower: entity.currentState.earningCumulativeProb25[i],
                earningsMedian: entity.currentState.earningCumulativeProb50[i],
                earningsUpper: entity.currentState.earningCumulativeProb75[i],
              };
            }
          ),
        },
      };
    }

    if (roiSectionsVisibility.showGoalState)
    {
      rocChartPlotData = {
        ...rocChartPlotData,
        goalState: {
          primaryColor: '#00CC08',
          secondaryColor: '#88FD8D',
          secondaryColorOpacity: 0.29, // -4A
          values: entity.goalState.time.map(
            (t: number, i): PlotLayerValueSnapshot =>
            {
              return {
                time: t,
                earningsLower: entity.goalState.earningCumulativeProb25[i],
                earningsMedian: entity.goalState.earningCumulativeProb50[i],
                earningsUpper: entity.goalState.earningCumulativeProb75[i],
              };
            }
          ),
        },
      };
    }

    if (roiSectionsVisibility.showAlumniData)
    {
      // TODO: add alumni data
    }

    // TODO: only add data before graduation date
    if (roiSectionsVisibility.showLoanAccumulation)
    {
      rocChartPlotData = {
        ...rocChartPlotData,
        loanAccumulation: {
          primaryColor: '#9400A2',
          secondaryColor: '#e9d8fd',
          secondaryColorOpacity: 1,
          values: entity.goalState.time.map(
            (t: number, i): PlotLayerValueSnapshot =>
            {
              return {
                time: t,
                earningsLower: null,
                earningsMedian:
                  -1 *
                  (entity.goalState.outOfPocket50[i] +
                    entity.goalState.federalLoanAveraged[i] +
                    entity.goalState.privateLoanAveraged[i]),
                earningsUpper: null,
              };
            }
          ),
        },
      };
    }

    // TODO: only add data on or after graduation date
    if (roiSectionsVisibility.showLoanPayoff)
    {
      rocChartPlotData = {
        ...rocChartPlotData,
        loanPayoff: {
          primaryColor: '#9400A2',
          secondaryColor: '#e9d8fd',
          secondaryColorOpacity: 1,
          values: entity.goalState.time.map(
            (t: number, i): PlotLayerValueSnapshot =>
            {
              return {
                time: t,
                earningsLower: null,
                earningsMedian:
                  -1 *
                  (entity.goalState.outOfPocket50[i] +
                    entity.goalState.federalLoanAveraged[i] +
                    entity.goalState.privateLoanAveraged[i]),
                earningsUpper: null,
              };
            }
          ),
        },
      };
    }

    return rocChartPlotData;
  }
);

export const getSelectedEntityForLegend = createSelector(
  getRoiCalculatorOutputsState,
  getSelectedEntity,
  (_: State, entity: RoiCalculatorOutputsEntity): RocLegendData =>
  {
    let yearsOfCollegeInput = 0;
    switch (entity?.roiCalculatorInputs.endDegreeLevel)
    {
      case 1:
        yearsOfCollegeInput = 2;
        break;
      case 2:
        yearsOfCollegeInput = 4;
        break;
      case 3:
        yearsOfCollegeInput = 2;
        break;
      case 4:
        yearsOfCollegeInput = 8;
        break;

      default:
        break;
    }

    return entity
      ? {
        currentStateLifetimeEarningLower:
          entity.currentState?.earningCumulativeProb25?.[
          entity.currentState?.earningCumulativeProb25?.length - 1
          ],
        currentStateLifetimeEarningUpper:
          entity.currentState?.earningCumulativeProb75?.[
          entity.currentState?.earningCumulativeProb75?.length - 1
          ],
        goalStateLifetimeEarningLower:
          entity.goalState?.earningCumulativeProb25?.[
          entity.goalState?.earningCumulativeProb25?.length - 1
          ],
        goalStateLifetimeEarningUpper:
          entity.goalState?.earningCumulativeProb75?.[
          entity.goalState?.earningCumulativeProb75?.length - 1
          ],
        cumulativeNetPrice:
          entity.roiCalculatorInputs?.avgNetPrice * yearsOfCollegeInput,
        cumulativeNetPricePlusLoanInterest: null,
        roiLower:
          entity.goalState?.roi25?.[entity.goalState?.roi25?.length - 1] /
          100,
        roiUpper:
          entity.goalState?.roi75?.[entity.goalState?.roi75?.length - 1] /
          100,
      }
      : null;
  }
);

export const selectRoiCalculatorOutputChartPopoverData = (
  rocChartPlotMarker: RocChartPlotMarker
) =>
  createSelector(
    getRoiCalculatorOutputsState,
    getSelectedEntity,
    getRoiSectionsVisibility,
    (
      _: State,
      entity: RoiCalculatorOutputsEntity,
      rocPlotsVisibility: RocPlotsVisibility
    ): RocChartPopoverData =>
    {
      const [mouseEvent, idx] = [
        rocChartPlotMarker.mouseEvent,
        rocChartPlotMarker.idx,
      ];

      return entity
        ? {
          time: entity.currentState.time[idx],
          mouseEvent,
          monthlySalary: {
            currentStateLower: entity.currentState.monthlySalary25?.[idx],
            currentStateMedian: entity.currentState.monthlySalary50?.[idx],
            currentStateUpper: entity.currentState.monthlySalary75?.[idx],
            goalStateLower: entity.goalState.monthlySalary25?.[idx],
            goalStateMedian: entity.goalState.monthlySalary50?.[idx],
            goalStateUpper: entity.goalState.monthlySalary75?.[idx],
            alumniStateValue: null, // TODO: add alumni data
          },
          // TODO: add living expenses
          monthlyLivingExpense: {
            currentStateMedian: null,
            currentStateCaption: entity.roiCalculatorInputs.currentZipCode.toString(),
            goalStateMedian: null,
            goalStateCaption: entity.roiCalculatorInputs.goalZipCode.toString(),
            alumniStateValue: null, // TODO: add alumni data
            alumniStateCaption: entity.roiCalculatorInputs.goalZipCode.toString(),
          },
          monthlyLoanPayment: {
            currentStateMedian: null,
            currentStateCaption: null,
            goalStateMedian: entity.goalState.monthlyLoanPayment50?.[idx],
            goalStateCaption: null, // TODO: calculate years until loans paid
            alumniStateValue: null, // TODO: add alumni data
            alumniStateCaption: null,
          },
          monthlyDisposableIncome: {
            currentStateMedian:
              entity.currentState.monthlySalary50?.[idx] - 0,
            goalStateMedian:
              entity.goalState.monthlySalary50?.[idx] -
              entity.goalState.monthlyLoanPayment50?.[idx] ?? 0 - 0, // TODO: add living expenses
            alumniStateValue: null, // TODO: add alumni and living expenses data
          },
          rocPlotsVisibility,
        }
        : null;
    }
  );
