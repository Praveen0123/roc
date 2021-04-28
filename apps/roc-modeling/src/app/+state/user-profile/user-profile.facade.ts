import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import { markCurrentInformationAsInitialized, processCareerGoalForm, processCurrentInformationForm, processEducationCostForm, takeUserProfileSnapshot, updateEducationFinancing } from './user-profile.actions';
import { CareerGoalForm, CurrentInformationForm, EducationCostForm, EducationFinancing } from './user-profile.models';
import { selectGoalInstructionalProgram, selectGoalOccupation, selectUserProfile } from './user-profile.selectors';
import { UserProfilePartialState } from './user-profile.state';

@Injectable()
export class UserProfileFacade
{
  readonly selectUserProfile$ = this.store.pipe(select(selectUserProfile));
  readonly selectGoalOccupation$ = this.store.pipe(select(selectGoalOccupation));
  readonly selectGoalInstructionalProgram$ = this.store.pipe(select(selectGoalInstructionalProgram));


  constructor
    (
      private store: Store<UserProfilePartialState>
    ) { }

  processCurrentInformationForm(currentInformationForm: CurrentInformationForm): void
  {
    this.dispatch(processCurrentInformationForm({ currentInformationForm }));
  }

  markCurrentInformationAsInitialized(): void
  {
    this.dispatch(markCurrentInformationAsInitialized());
  }

  processCareerGoalForm(careerGoalForm: CareerGoalForm): void
  {
    this.dispatch(processCareerGoalForm({ careerGoalForm }));
  }

  processEducationCostForm(educationCostForm: EducationCostForm): void
  {
    this.dispatch(processEducationCostForm({ educationCostForm }));
  }







  updateEducationFinancing(educationFinancing: EducationFinancing): void
  {
    this.dispatch(updateEducationFinancing({ educationFinancing }));
  }

  takeUserProfileSnapshot(): void
  {
    this.dispatch(takeUserProfileSnapshot());
  }

  private dispatch(action: Action): void
  {
    this.store.dispatch(action);
  }
}
