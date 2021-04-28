import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { RoiCalculatorOutputGQL } from '@gql';
import { RoiCalculatorOutputsEntity } from './roi-calculator-outputs.models';
import * as fromRoiCalculatorOutputs from './roi-calculator-outputs.reducer';
import * as RoiCalculatorOutputsSelectors from './roi-calculator-outputs.selectors';
import * as RoiCalculatorOutputsActions from './roi-calculator-outputs.actions';

@Injectable()
export class RoiCalculatorOutputsEffects {
  loadRoiCalculatorOutput$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoiCalculatorOutputsActions.loadRoiCalculatorOutput),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(RoiCalculatorOutputsSelectors.getRoiCalculatorOutputsIds)
            )
          )
        )
      ),
      switchMap(([{ roiCalculatorInputs }, ids]) => {
        const newId = fromRoiCalculatorOutputs.calculateIdFromInputs(
          roiCalculatorInputs
        );
        if (!ids.includes(newId)) {
          return this.roiCalculatorOutputGQL
            .fetch({
              currentZipCode: roiCalculatorInputs.currentZipCode,
              goalZipCode: roiCalculatorInputs.goalZipCode
                ? roiCalculatorInputs.goalZipCode
                : roiCalculatorInputs.currentZipCode,
              distance: roiCalculatorInputs.distance,
              currentStateOnetCode: roiCalculatorInputs.currentStateOnetCode,
              goalStateOnetCode: roiCalculatorInputs.goalStateOnetCode,
              startDegreeLevel: roiCalculatorInputs.startDegreeLevel,
              endDegreeLevel: roiCalculatorInputs.endDegreeLevel,
              yearsToRetirement: roiCalculatorInputs.yearsToRetirement,
              avgNetPrice: roiCalculatorInputs.avgNetPrice,
              monthsToPayoffFederalLoan:
                roiCalculatorInputs.monthsToPayoffFederalLoan,
              monthsToPayoffPrivateLoan:
                roiCalculatorInputs.monthsToPayoffPrivateLoan,
              annualExpenseFromSavings: roiCalculatorInputs.avgNetPrice
                ? roiCalculatorInputs.annualExpenseFromSavings
                : [0]
            })
            .pipe(
              map((apolloResults) => {
                return RoiCalculatorOutputsActions.loadRoiCalculatorOutputSuccess(
                  {
                    roiCalculatorOutput: {
                      ...apolloResults.data,
                      roiCalculatorInputs
                    } as RoiCalculatorOutputsEntity
                  }
                );
              }),
              catchError((error) =>
                of(
                  RoiCalculatorOutputsActions.loadRoiCalculatorOutputFailure({
                    error
                  })
                )
              )
            );
        }
        return of(
          RoiCalculatorOutputsActions.updateSelectedId({
            selectedId: newId
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private roiCalculatorOutputGQL: RoiCalculatorOutputGQL,
    private store: Store<
      fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState
    >
  ) {}
}
