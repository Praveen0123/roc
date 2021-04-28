import { Institution, InstructionalProgram, Location, Occupation, RoiCalculatorOutputQueryVariables } from '@gql';
import { EducationLevelEnum, IncomeRangeEnum, LivingConditionTypeEnum, ResidencyTypeEnum } from '@models/enums';
import { InstitutionsEntity } from '@state/institutions/institutions.models';
import { SearchResultModel } from '@vantage-point/auto-complete-textbox';


export interface UserProfileModel
{
  currentInformation: CurrentInformation;
  careerGoal: CareerGoal;
  educationCost: EducationCost;
  educationCostRefinement: EducationCostRefinement;
  educationFinancing: EducationFinancing;
  userProfileSnapshots: UserProfileSnapshot[];
}

export interface UserProfileSnapshot extends Omit<UserProfileModel, 'userProfileSnapshots'> { }



/* #region  CURRENT INFORMATION */

export interface CurrentInformation
{
  currentAge: number;
  currentOccupation?: Occupation;
  educationLevel: EducationLevelEnum;
  currentLocation: Location;
  radiusInMiles: number;
  isCurrentInformationValid: boolean;
  hasCurrentInformationBeenInitialized: boolean;
}
export interface CurrentInformationForm
{
  currentAge: number;
  currentOccupation?: SearchResultModel;
  educationLevel: EducationLevelEnum;
  currentLocation: SearchResultModel;
  isCurrentInformationValid: boolean;
}

/* #endregion */



/* #region  CAREER GOAL */

export enum CareerGoalPathEnum
{
  ExploreCareers = 0,
  ExploreDegrees = 1
}
export interface CareerGoal
{
  location: Location;
  occupation: Occupation;
  degreeLevel: EducationLevelEnum;
  degreeProgram: InstructionalProgram;
  retirementAge: number;
  isCareerGoalValid: boolean;
  careerGoalPathType: CareerGoalPathEnum;
}
export interface CareerGoalForm
{
  location: SearchResultModel;
  degreeLevel: EducationLevelEnum;
  degreeProgram: SearchResultModel;
  occupation: SearchResultModel;
  retirementAge: number;
  isCareerGoalValid: boolean;
  careerGoalPathType: CareerGoalPathEnum;
}

/* #endregion */



/* #region  EDUCATION COSTS */

export interface EducationCost
{
  institution: Institution;
  startYear: number;
  incomeRange: IncomeRangeEnum;
  isFulltime: boolean;
  yearsToCompleteDegree: number;
  isEducationCostValid: boolean;
}
export interface EducationCostForm
{
  institution: SearchResultModel;
  startYear: number;
  incomeRange: IncomeRangeEnum;
  isFulltime: boolean;
  yearsToCompleteDegree: number;
  isEducationCostValid: boolean;
}
export interface EducationCostRefinement
{
  residencyType: ResidencyTypeEnum;
  livingConditionTypeEnum: LivingConditionTypeEnum;
  costOfAttendance: CostOfAttendance;
  grantsAndScholarships: GrantsAndScholarships;
}
export interface CostOfAttendance
{
  tuitionAndFees: number;
  booksAndSupplies: number;
  roomAndBoard: number;
  otherExpenses: number;
}
export interface GrantsAndScholarships
{
  federalPellGrant: number;
  otherFederalGrants: number;
  stateOrLocalGrants: number;
  institutionalGrants: number;
  otherGrants: number;
  giBillBenefits: number;
  dodTuitionAssistance: number;
}

/* #endregion */



/* #region  EDUCATION FINANCING */

export interface EducationFinancing
{
  isTaxDependent: boolean;
  outOfPocketAmount: number[];
  federalLoanAmount: number[];
  privateLoanAmount: number[];
  yearsToPayOffFederalLoan: number;
  yearsToPayOffPrivateLoan: number;
}

/* #endregion */







export function deepEqual(object1: any, object2: any): boolean
{
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length)
  {
    return false;
  }

  for (const key of keys1)
  {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    )
    {
      return false;
    }
  }

  return true;
}

function isObject(object: any): boolean
{
  return object != null && typeof object === 'object';
}

export function ConvertUserProfileSnaphsotToRoiCalculatorInputs
  (
    userProfileSnapshot: UserProfileSnapshot,
    institution: InstitutionsEntity
  ): RoiCalculatorOutputQueryVariables
{
  const currentInformation: CurrentInformation = userProfileSnapshot.currentInformation;
  const careerGoal: CareerGoal = userProfileSnapshot.careerGoal;

  console.log('ROC INPUTS | userProfileSnapshot', userProfileSnapshot);
  console.log('ROC INPUTS | careerGoal', careerGoal.location?.zipCode);
  console.log('ROC INPUTS | currentInformation', currentInformation.currentLocation?.zipCode);

  const roiCalculatorOutputQueryVariables: RoiCalculatorOutputQueryVariables =
  {
    currentZipCode: currentInformation.currentLocation?.zipCode,
    goalZipCode: careerGoal.location?.zipCode ?? currentInformation.currentLocation?.zipCode,
    distance: currentInformation.radiusInMiles,
    currentStateOnetCode: [currentInformation.currentOccupation?.onetCode],
    goalStateOnetCode: [careerGoal.occupation?.onetCode],
    startDegreeLevel: currentInformation.educationLevel.value,
    endDegreeLevel: careerGoal.degreeLevel?.value,
    yearsToRetirement: Math.max(careerGoal.retirementAge - currentInformation.currentAge, 1),
    avgNetPrice: institution?.avgNetPriceWithGrantScholarshipAid ?? 0,
    monthsToPayoffFederalLoan: userProfileSnapshot.educationFinancing.yearsToPayOffFederalLoan * 12,
    monthsToPayoffPrivateLoan: userProfileSnapshot.educationFinancing.yearsToPayOffPrivateLoan * 12,
    annualExpenseFromSavings: userProfileSnapshot.educationFinancing.outOfPocketAmount
  };

  console.log('roiCalculatorOutputQueryVariables', roiCalculatorOutputQueryVariables);

  return roiCalculatorOutputQueryVariables;
}
