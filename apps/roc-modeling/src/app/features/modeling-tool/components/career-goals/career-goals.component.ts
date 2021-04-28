import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CareerGoalForm, UserProfileModel } from '@app/+state/user-profile/user-profile.models';


@Component({
  selector: 'roc-career-goals',
  templateUrl: './career-goals.component.html',
  styleUrls: ['./career-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerGoalsComponent implements OnInit
{
  @Input() userProfileModel: UserProfileModel;
  @Output('onCareerGoalSubmitted') careerGoalEventEmitter = new EventEmitter<CareerGoalForm>();

  selectedTabIndex: number;

  constructor() { }

  ngOnInit(): void
  {
    this.selectedTabIndex = this.userProfileModel.careerGoal.careerGoalPathType;
    console.log('selectedTabIndex', this.selectedTabIndex);
  }

  onExploreCareersSubmitted(careerGoalForm: CareerGoalForm)
  {
    this.emitCareerGoal(careerGoalForm);
  }

  onExploreDegreesSubmitted(careerGoalForm: CareerGoalForm)
  {
    this.emitCareerGoal(careerGoalForm);
  }

  private emitCareerGoal(careerGoalForm: CareerGoalForm)
  {
    if (this.careerGoalEventEmitter.observers.length > 0)
    {
      this.careerGoalEventEmitter.emit(careerGoalForm);
    }
  }
}
