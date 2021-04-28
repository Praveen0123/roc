import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoiCalculatorOutputs from './roi-calculator-outputs.reducer';
import * as RoiCalculatorOutputsSelectors from './roi-calculator-outputs.selectors';
import * as RoiCalculatorOutputsActions from './roi-calculator-outputs.actions';
import { RoiCalculatorOutputQueryVariables } from '@gql';
import { RocChartPlotMarker } from '@models/roc';

@Injectable()
export class RoiCalculatorOutputsFacade {
  readonly selectedRoiCalculatorOutput$ = this.store.pipe(
    select(RoiCalculatorOutputsSelectors.getSelectedEntity)
  );
  readonly selectedRoiCalculatorOutputChartPlotData$ = this.store.pipe(
    select(RoiCalculatorOutputsSelectors.getSelectedEntityChartPlotData)
  );
  readonly selectedRoiCalculatorOutputForLegend$ = this.store.pipe(
    select(RoiCalculatorOutputsSelectors.getSelectedEntityForLegend)
  );
  readonly selectedRoiSectionsVisibility$ = this.store.pipe(
    select(RoiCalculatorOutputsSelectors.getRoiSectionsVisibility)
  );
  readonly getRoiCalculatorOutputsLoading$ = this.store.pipe(
    select(RoiCalculatorOutputsSelectors.getRoiCalculatorOutputsLoading)
  );
  readonly selectRoiCalculatorOutputChartPopoverData$ = (
    rocChartPlotMarker: RocChartPlotMarker
  ) =>
    this.store.pipe(
      select(
        RoiCalculatorOutputsSelectors.selectRoiCalculatorOutputChartPopoverData(
          rocChartPlotMarker
        )
      )
    );

  constructor(
    private store: Store<
      fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState
    >
  ) {}

  getRoiCalculatorOutput(
    roiCalculatorInputs: RoiCalculatorOutputQueryVariables
  ): void {
    this.dispatch(
      RoiCalculatorOutputsActions.getRoiCalculatorOutput({
        roiCalculatorInputs,
      })
    );
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
