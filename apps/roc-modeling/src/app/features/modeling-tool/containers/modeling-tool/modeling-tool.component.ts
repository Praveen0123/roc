import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserProfileFacade } from '@state/user-profile/user-profile.facade';
import { CareerGoalForm, CurrentInformationForm, EducationCostForm, UserProfileModel } from '@state/user-profile/user-profile.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'roc-tool',
  templateUrl: './modeling-tool.component.html',
  styleUrls: ['./modeling-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelingToolComponent implements OnInit
{
  userProfileModel$: Observable<UserProfileModel>;


  constructor
    (
      private userProfileFacade: UserProfileFacade
    ) { }

  ngOnInit(): void
  {
    this.userProfileModel$ = this.userProfileFacade.selectUserProfile$;
  }

  onCurrentInformationSubmitted(currentInformationForm: CurrentInformationForm)
  {
    this.userProfileFacade.processCurrentInformationForm(currentInformationForm);
  }

  markCurrentInformationAsInitialized()
  {
    this.userProfileFacade.markCurrentInformationAsInitialized();
  }

  onCareerGoalSubmitted(careerGoalForm: CareerGoalForm)
  {
    this.userProfileFacade.processCareerGoalForm(careerGoalForm);
  }

  onEducationCostSubmitted(educationCostForm: EducationCostForm)
  {
    this.userProfileFacade.processEducationCostForm(educationCostForm);
  }

}
