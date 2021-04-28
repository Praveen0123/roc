import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromInstitutions from '../institutions/institutions.reducer';
import * as fromInstructionalProgram from '../instructional-programs/instructional-programs.reducer';
import * as fromOccupations from '../occupations/occupations.reducer';
import { USER_PROFILE_FEATURE_KEY, UserProfileState } from './user-profile.state';


export const selectUserProfileState = createFeatureSelector<UserProfileState>(USER_PROFILE_FEATURE_KEY);

export const selectInstitutionsState = createFeatureSelector<fromInstitutions.State>(fromInstitutions.INSTITUTIONS_FEATURE_KEY);

export const selectInstructionalProgramsState = createFeatureSelector<fromInstructionalProgram.State>(fromInstructionalProgram.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY);

export const selectOccupationsState = createFeatureSelector<fromOccupations.State>(fromOccupations.OCCUPATIONS_FEATURE_KEY);

export const selectUserProfile = createSelector
  (
    selectUserProfileState,
    (state: UserProfileState) => state.userProfileModel
  );


export const selectGoalOccupation = createSelector
  (
    selectUserProfileState,
    selectOccupationsState,
    (state: UserProfileState, occupationsState: fromOccupations.State) =>
    {
      const goalOnetCode: string = state.userProfileModel?.careerGoal?.occupation?.onetCode;

      return occupationsState.entities[goalOnetCode];
    }
  );

export const selectGoalInstructionalProgram = createSelector
  (
    selectUserProfileState,
    selectInstructionalProgramsState,
    (state: UserProfileState, instructionalProgramsState: fromInstructionalProgram.State) =>
    {
      const goalCIPCode: string = state.userProfileModel?.careerGoal?.degreeProgram?.cipCode;
      const degreeLevel: string = state.userProfileModel?.careerGoal?.degreeLevel?.displayName;
      const key: string = `${goalCIPCode}_${degreeLevel}`;

      return instructionalProgramsState.entities[key];
    }
  );

export const selectInstitution = createSelector
  (
    selectUserProfileState,
    selectInstitutionsState,
    (userProfileState: UserProfileState) => userProfileState.userProfileModel.educationCost.institution
  );
