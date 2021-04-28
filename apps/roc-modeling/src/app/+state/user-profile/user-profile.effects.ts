import { Injectable } from '@angular/core';
import { CONFIG } from '@app/config/config';
import { InstructionalProgramGQL, LocationByZipCodeGQL, OccupationByOnetCodeGQL } from '@gql';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { processCareerGoalForm, processCurrentInformationForm, processEducationCostForm, updateCareerGoalFromFormSubmission, updateCurrentInformationFromFormSubmission, updateEducationCostFromFormSubmission } from './user-profile.actions';
import { CareerGoal, CareerGoalForm, CurrentInformation, CurrentInformationForm, EducationCost, EducationCostForm } from './user-profile.models';


@Injectable()
export class UserProfileEffects
{

  constructor
    (
      private actions$: Actions,
      private locationByZipCodeGQL: LocationByZipCodeGQL,
      private occupationByOnetCodeGQL: OccupationByOnetCodeGQL,
      private instructionalProgramGQL: InstructionalProgramGQL
    ) { }


  processCurrentInformationForm$ = createEffect(() => this.actions$.pipe
    (
      ofType(processCurrentInformationForm),
      switchMap((action) =>
      {
        const formData: CurrentInformationForm = action.currentInformationForm;
        const locationId: string = formData?.currentLocation?.id;
        const occupationId: string = formData?.currentOccupation?.id;

        /*
        RETRIEVE LOCATION AND OCCUPATION FROM BACKEND....
        */
        return forkJoin
          (
            {
              location: (locationId) ? this.locationByZipCodeGQL.fetch({ zipCode: locationId, cityNameOverride: formData.currentLocation.name }) : of(null),
              occupation: (occupationId) ? this.occupationByOnetCodeGQL.fetch({ onetCode: occupationId, occupationTitleOverride: formData.currentOccupation.name }) : of(null)
            }
          )
          .pipe
          (
            map((results) =>
            {
              const currentInformation: CurrentInformation =
              {
                currentAge: formData.currentAge,
                currentOccupation: (results.occupation) ? results.occupation.data.occupationByOnetCode : null,
                educationLevel: formData.educationLevel,
                currentLocation: (results.location) ? results.location.data.locationByZipCode : null,
                radiusInMiles: CONFIG.USER_PROFILE.RADIUS_IN_MILES,
                isCurrentInformationValid: formData.isCurrentInformationValid,
                hasCurrentInformationBeenInitialized: false
              };

              return updateCurrentInformationFromFormSubmission({ currentInformation: currentInformation });
            })
          );
      })
    ));


  processCareerGoalForm$ = createEffect(() => this.actions$.pipe
    (
      ofType(processCareerGoalForm),
      // withLatestFrom
      //   (
      //     this.store.pipe(select(selectUserProfile))
      //   ),
      switchMap((action) =>
      {
        const formData: CareerGoalForm = action.careerGoalForm;
        const locationId: string = formData?.location?.id;
        const occupationId: string = formData?.occupation?.id;
        const cipCode: string = formData?.degreeProgram?.id;

        // console.log('EFFECTS | CAREER GOAL FORM DATA', formData);

        /*
        RETRIEVE LOCATION AND OCCUPATION FROM BACKEND....
        */
        return forkJoin
          (
            {
              location: (locationId) ? this.locationByZipCodeGQL.fetch({ zipCode: locationId, cityNameOverride: formData.location.name }) : of(null),
              occupation: (occupationId) ? this.occupationByOnetCodeGQL.fetch({ onetCode: occupationId, occupationTitleOverride: formData.occupation.name }) : of(null),
              program: (cipCode) ? this.instructionalProgramGQL.fetch({ cipCode: cipCode }) : of(null)
            }
          )
          .pipe
          (
            map((results) =>
            {
              // console.log('EFFECTS | RESULTS:', results);

              const careerGoal: CareerGoal =
              {
                location: (results.location) ? results.location.data.locationByZipCode : null,
                occupation: (results.occupation) ? results.occupation.data.occupationByOnetCode : null,
                degreeLevel: formData.degreeLevel,
                degreeProgram: (results.program) ? results.program.data.instructionalProgram : null,
                retirementAge: formData.retirementAge,
                isCareerGoalValid: formData.isCareerGoalValid,
                careerGoalPathType: formData.careerGoalPathType
              };

              // console.log('EFFECTS | CAREER GOAL:', careerGoal);

              return updateCareerGoalFromFormSubmission({ careerGoal: careerGoal });
            })
          );
      })
    ));


  processEducationCostForm$ = createEffect(() => this.actions$.pipe
    (
      ofType(processEducationCostForm),
      switchMap((action) =>
      {
        const formData: EducationCostForm = action.educationCostForm;
        // const institutionId: string = formData?.institution?.id;
        const institutionId: string = null;

        /*
        RETRIEVE INSTITUTION FROM BACKEND....
        */
        return forkJoin
          (
            {
              institution: (institutionId) ? this.locationByZipCodeGQL.fetch({ zipCode: institutionId }) : of(null),
            }
          )
          .pipe
          (
            map((results) =>
            {
              const educationCost: EducationCost =
              {
                institution: (results.institution) ? results.institution.data.locationByZipCode : null,
                startYear: formData.startYear,
                incomeRange: formData.incomeRange,
                isFulltime: formData.isFulltime,
                yearsToCompleteDegree: formData.yearsToCompleteDegree,
                isEducationCostValid: formData.isEducationCostValid
              };

              return updateEducationCostFromFormSubmission({ educationCost: educationCost });
            })
          );
      })
    ));


}
