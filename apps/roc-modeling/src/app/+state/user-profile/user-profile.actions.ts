import { createAction, props } from '@ngrx/store';

import { CareerGoal, CareerGoalForm, CurrentInformation, CurrentInformationForm, EducationCost, EducationCostForm, EducationFinancing } from './user-profile.models';


/* #region  CURRRENT INFORMATION ACTIONS */

export const processCurrentInformationForm = createAction
  (
    '[UserProfile] process current information form',
    props<{ currentInformationForm: CurrentInformationForm; }>()
  );

export const updateCurrentInformationFromFormSubmission = createAction
  (
    '[UserProfile] update current information from form submission',
    props<{ currentInformation: CurrentInformation; }>()
  );

export const markCurrentInformationAsInitialized = createAction
  (
    '[UserProfile] mark current information as initialized'
  );

/* #endregion */


/* #region  CAREER GOAL ACTIONS */

export const processCareerGoalForm = createAction
  (
    '[UserProfile] process career goal form',
    props<{ careerGoalForm: CareerGoalForm; }>()
  );

export const updateCareerGoalFromFormSubmission = createAction
  (
    '[UserProfile] update career goal from form submission',
    props<{ careerGoal: CareerGoal; }>()
  );

/* #endregion */


/* #region  EDUCATION COST ACTIONS */

export const processEducationCostForm = createAction
  (
    '[UserProfile] process education cost form',
    props<{ educationCostForm: EducationCostForm; }>()
  );

export const updateEducationCostFromFormSubmission = createAction
  (
    '[UserProfile] update education cost from form submission',
    props<{ educationCost: EducationCost; }>()
  );

/* #endregion */


/* #region  EDUCATION FINANCING ACTIONS */

export const updateEducationFinancingFromFormSubmission = createAction
  (
    '[UserProfile] update education financing from form submission',
    props<{ educationFinancing: EducationFinancing; }>()
  );

/* #endregion */






export const updateEducationFinancing = createAction
  (
    '[UserProfile] Update Education Financing',
    props<{ educationFinancing: EducationFinancing; }>()
  );

export const takeUserProfileSnapshot = createAction
  (
    '[UserProfile] Take User Profile Snapshot'
  );
