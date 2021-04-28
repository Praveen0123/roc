import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { InstitutionsStateModule } from './institutions/institutions-state.module';
import * as fromInstitutions from './institutions/institutions.reducer';
import { InstructionalProgramsStateModule } from './instructional-programs/instructional-programs-state.module';
import * as fromInstructionalPrograms from './instructional-programs/instructional-programs.reducer';
import { OccupationsStateModule } from './occupations/occupations-state.module';
import * as fromOccupations from './occupations/occupations.reducer';
import { RoiCalculatorOutputsStateModule } from './roi-calculator-outputs/roi-calculator-outputs-state.module';
import * as fromRoiCalculatorOutputs from './roi-calculator-outputs/roi-calculator-outputs.reducer';
import { UserProfileStateModule } from './user-profile/user-profile-state.module';
import { userProfileReducer } from './user-profile/user-profile.reducer';
import { USER_PROFILE_FEATURE_KEY, UserProfilePartialState } from './user-profile/user-profile.state';

// Root State - extend all partial states
export interface IRootState
  extends fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState,
  fromOccupations.OccupationsPartialState,
  fromInstructionalPrograms.InstructionalProgramsPartialState,
  fromInstitutions.InstitutionsPartialState,
  UserProfilePartialState
{
  router: RouterReducerState;
}

// Map root state's properties (partial states) to their reducers
export const reducers: ActionReducerMap<IRootState> =
{
  router: routerReducer,
  [fromRoiCalculatorOutputs.ROI_CALCULATOR_OUTPUTS_FEATURE_KEY]: fromRoiCalculatorOutputs.reducer,
  [fromOccupations.OCCUPATIONS_FEATURE_KEY]: fromOccupations.reducer,
  [fromInstructionalPrograms.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY]: fromInstructionalPrograms.reducer,
  [fromInstitutions.INSTITUTIONS_FEATURE_KEY]: fromInstitutions.reducer,
  [USER_PROFILE_FEATURE_KEY]: userProfileReducer,
};

// Create a store meta reducer to allow caching in browser
export function storageSyncReducer(reducer: ActionReducer<IRootState>): any
{
  // provide all feature states within the features array
  // features which are not provided, do not get synced
  const metaReducer = storageSync<
    fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState
  >({
    features: [
      // save only router state to sessionStorage
      { stateKey: 'router', storageForFeature: window.sessionStorage },
      { stateKey: fromRoiCalculatorOutputs.ROI_CALCULATOR_OUTPUTS_FEATURE_KEY },
      { stateKey: fromOccupations.OCCUPATIONS_FEATURE_KEY },
      { stateKey: fromInstructionalPrograms.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY },
      { stateKey: fromInstitutions.INSTITUTIONS_FEATURE_KEY },
      { stateKey: USER_PROFILE_FEATURE_KEY },
      // exclude key 'success' inside 'auth' and all keys 'loading' inside 'feature1'
      { stateKey: 'feature1', excludeKeys: ['auth.success', 'loading'] },
    ],
    storage: window.sessionStorage,
  });

  return metaReducer(reducer);
}

@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forRoot
        (
          reducers,
          {
            metaReducers: typeof window !== 'undefined' ? [storageSyncReducer] : [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
            },
          }
        ),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot(),
      StoreDevtoolsModule.instrument
        (
          {
            maxAge: 25,
            logOnly: environment.production,
          }
        )
    ],
  declarations:
    [
    ],
  exports:
    [
      RoiCalculatorOutputsStateModule,
      OccupationsStateModule,
      InstructionalProgramsStateModule,
      InstitutionsStateModule,
      UserProfileStateModule,
    ],
})
export class RootStoreModule { }
