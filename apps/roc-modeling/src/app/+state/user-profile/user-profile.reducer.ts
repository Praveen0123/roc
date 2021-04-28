import { createReducer, on } from '@ngrx/store';

import { markCurrentInformationAsInitialized, takeUserProfileSnapshot, updateCareerGoalFromFormSubmission, updateCurrentInformationFromFormSubmission, updateEducationCostFromFormSubmission, updateEducationFinancing } from './user-profile.actions';
import { deepEqual, UserProfileSnapshot } from './user-profile.models';
import { initialUserProfileState } from './user-profile.state';



export const userProfileReducer = createReducer
  (
    initialUserProfileState,


    /* #region  CURRRENT INFORMATION */

    on(updateCurrentInformationFromFormSubmission, (state, { currentInformation }) =>
    {
      return { ...state, userProfileModel: { ...state.userProfileModel, currentInformation } };
    }),

    on(markCurrentInformationAsInitialized, (state) =>
    {
      return {
        ...state, userProfileModel:
        {
          ...state.userProfileModel,
          currentInformation:
          {
            ...state.userProfileModel.currentInformation, hasCurrentInformationBeenInitialized: true
          }
        }
      };
    }),

    /* #endregion */



    /* #region  CAREER GOAL  */

    on(updateCareerGoalFromFormSubmission, (state, { careerGoal }) =>
    {
      return { ...state, userProfileModel: { ...state.userProfileModel, careerGoal } };
    }),

    /* #endregion */



    /* #region  EDUCATION COST  */

    on(updateEducationCostFromFormSubmission, (state, { educationCost }) =>
    {
      return { ...state, userProfileModel: { ...state.userProfileModel, educationCost } };
    }),

    /* #endregion */







    on(updateEducationFinancing, (state, { educationFinancing }) =>
    {
      return {
        ...state,
        userProfileModel: { ...state.userProfileModel, educationFinancing }
      };
    }),
    on(takeUserProfileSnapshot, (state) =>
    {
      const newUserProfileSnapshot: UserProfileSnapshot =
      {
        ...state.userProfileModel
      };

      if (!state.userProfileModel.userProfileSnapshots.some((x) => deepEqual(x, newUserProfileSnapshot)))
      {
        return {
          ...state,
          userProfileModel:
          {
            ...state.userProfileModel,
            userProfileSnapshots:
              [
                ...state.userProfileModel.userProfileSnapshots,
                newUserProfileSnapshot
              ]
          }
        };
      }

      return state;
    })
  );
