import { LivingConditionTypeEnum } from '@app/core/models/enums';
import { CONFIG } from '@config';

import { CareerGoalPathEnum, UserProfileModel } from './user-profile.models';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface UserProfileState
{
  userProfileModel: UserProfileModel;
  error: any;
}

export interface UserProfilePartialState
{
  readonly [USER_PROFILE_FEATURE_KEY]: UserProfileState;
}

export const initialUserProfileState: UserProfileState =
{
  userProfileModel:
  {
    currentInformation:
    {
      currentAge: CONFIG.USER_PROFILE.DEFAULT_AGE,
      currentOccupation: null,
      educationLevel: null,
      currentLocation: null,
      radiusInMiles: CONFIG.USER_PROFILE.RADIUS_IN_MILES,
      isCurrentInformationValid: false,
      hasCurrentInformationBeenInitialized: false
    },
    careerGoal:
    {
      location: null,
      occupation: null,
      degreeLevel: null,
      degreeProgram: null,
      retirementAge: CONFIG.USER_PROFILE.DEFAULT_RETIREMENT_AGE,
      isCareerGoalValid: false,
      careerGoalPathType: CareerGoalPathEnum.ExploreCareers
    },
    educationCost:
    {
      institution: null,
      startYear: new Date().getFullYear(),
      incomeRange: null,
      isFulltime: false,
      yearsToCompleteDegree: CONFIG.EDUCATION_COST.YEARS_TO_COMPLETE_DEFAULT,
      isEducationCostValid: false
    },
    educationCostRefinement:
    {
      residencyType: null,
      livingConditionTypeEnum: LivingConditionTypeEnum.UNKNOWN,
      costOfAttendance: null,
      grantsAndScholarships: null
    },
    educationFinancing:
    {
      isTaxDependent: false,
      outOfPocketAmount: [0],
      federalLoanAmount: [0],
      privateLoanAmount: [0],
      yearsToPayOffFederalLoan: CONFIG.EDUCATION_FINANCING.DEFAULT_PAY_OFF_FEDERAL_LOAN_IN_YEARS,
      yearsToPayOffPrivateLoan: CONFIG.EDUCATION_FINANCING.DEFAULT_PAY_OFF_PRIVATE_LOAN_IN_YEARS
    },
    userProfileSnapshots: []
  },
  error: null
};
