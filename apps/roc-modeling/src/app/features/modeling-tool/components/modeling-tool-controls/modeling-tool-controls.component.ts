import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CareerGoalForm, CurrentInformationForm, EducationCostForm, UserProfileModel } from '@state/user-profile/user-profile.models';

@Component({
  selector: 'roc-tool-controls',
  templateUrl: './modeling-tool-controls.component.html',
  styleUrls: ['./modeling-tool-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelingToolControlsComponent implements OnInit, OnChanges
{
  @Input() userProfileModel: UserProfileModel;
  @Output('onCurrentInformationSubmitted') currentInformationEventEmitter = new EventEmitter<CurrentInformationForm>();
  @Output('markCurrentInformationAsInitialized') initializeCurrentInformationEventEmitter = new EventEmitter<void>();
  @Output('onCareerGoalSubmitted') careerGoalEventEmitter = new EventEmitter<CareerGoalForm>();
  @Output('onEducationCostSubmitted') educationCostEventEmitter = new EventEmitter<EducationCostForm>();


  isCurrentInformationValid: boolean = false;
  isCareerGoalValid: boolean = false;
  isEducationCostValid: boolean = false;

  constructor() { }

  ngOnInit(): void
  {
    this.checkValidity();
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.userProfileModel && !changes.userProfileModel.firstChange)
    {
      this.checkValidity();
    }
  }

  onCurrentInformationSubmitted(currentInformationForm: CurrentInformationForm)
  {
    if (this.currentInformationEventEmitter.observers.length > 0)
    {
      this.currentInformationEventEmitter.emit(currentInformationForm);
    }
  }

  onCareerGoalSubmitted(careerGoalForm: CareerGoalForm)
  {
    if (this.careerGoalEventEmitter.observers.length > 0)
    {
      this.careerGoalEventEmitter.emit(careerGoalForm);
    }
  }

  onEducationCostSubmitted(educationCostForm: EducationCostForm)
  {
    if (this.educationCostEventEmitter.observers.length > 0)
    {
      this.educationCostEventEmitter.emit(educationCostForm);
    }
  }

  currentInformationCollapsed()
  {
    if (!this.userProfileModel.currentInformation.hasCurrentInformationBeenInitialized && this.initializeCurrentInformationEventEmitter.observers.length > 0)
    {
      this.initializeCurrentInformationEventEmitter.emit();
    }
  }


  private checkValidity()
  {
    this.isCurrentInformationValid = this.userProfileModel.currentInformation.isCurrentInformationValid;
    this.isCareerGoalValid = this.userProfileModel.careerGoal.isCareerGoalValid;
    this.isEducationCostValid = this.userProfileModel.educationCost.isEducationCostValid;
  }

}
