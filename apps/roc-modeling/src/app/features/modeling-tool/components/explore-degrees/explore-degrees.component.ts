import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerGoal, CareerGoalForm, CareerGoalPathEnum, UserProfileModel } from '@app/+state/user-profile/user-profile.models';
import { CONFIG } from '@app/config/config';
import { Occupation } from '@gql';
import { EducationLevelEnum } from '@models/enums';
import { AutoCompleteTypeEnum, SearchResultModel } from '@vantage-point/auto-complete-textbox';
import orderBy from 'lodash.orderby';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'roc-explore-degrees',
  templateUrl: './explore-degrees.component.html',
  styleUrls: ['./explore-degrees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreDegreesComponent implements OnInit, OnDestroy, OnChanges
{
  private alive = true;

  @Input() userProfileModel: UserProfileModel;
  @Output('onExploreDegreesSubmitted') formSubmissionEventEmitter = new EventEmitter<CareerGoalForm>();

  formGroup: FormGroup;
  autoCompleteTypeEnum: typeof AutoCompleteTypeEnum = AutoCompleteTypeEnum;

  availableEducationLevel: EducationLevelEnum[];
  retirementAgeMinimum: number = CONFIG.USER_PROFILE.RETIREMENT_AGE_MINIMUM;
  retirementAgeMaximum: number = CONFIG.USER_PROFILE.RETIREMENT_AGE_MAXIMUM;
  occupationList: SearchResultModel[];


  constructor
    (
      private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void
  {
    this.initialize();
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.userProfileModel && !changes.userProfileModel.firstChange)
    {
      this.initialize();
    }
  }

  onFormSubmit(): void
  {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid)
    {
      this.emitFormSubmission();
    }
  }

  compareEducationLevelFunction(option: EducationLevelEnum, selectedItem: EducationLevelEnum): boolean
  {
    return (option && selectedItem) ? option.value === selectedItem.value : false;
  }

  compareOccupationFunction(option: SearchResultModel, selectedItem: SearchResultModel): boolean
  {
    return (option && selectedItem) ? option.id === selectedItem.id : false;
  }


  private initialize()
  {
    this.availableEducationLevel = EducationLevelEnum.getEducationLevelGoalOptions();
    this.occupationList = this.occupationListFromInstructionalProgram();

    this.buildForm();
  }

  private buildForm()
  {
    const careerGoalForm: CareerGoalForm = this.toCareerGoalForm();

    this.formGroup = this.formBuilder.group
      ({
        location: [careerGoalForm.location],
        occupation: [careerGoalForm.occupation],
        degreeLevel: [careerGoalForm.degreeLevel, Validators.required],
        degreeProgram: [careerGoalForm.degreeProgram, Validators.required],
        retirementAge: [careerGoalForm.retirementAge]
      });

    this.buildValueChange();
  }

  private buildValueChange()
  {
    this.formGroup.valueChanges
      .pipe
      (
        takeWhile(() => this.alive),
        map(() =>
        {
          this.emitFormSubmission();
        })
      ).subscribe();
  }

  private emitFormSubmission()
  {
    if (this.formSubmissionEventEmitter.observers.length > 0)
    {
      const degreeProgram: SearchResultModel = this.formGroup.controls.degreeProgram.value;
      const occupation: SearchResultModel = (degreeProgram === null) ? null : this.formGroup.controls.occupation.value;

      const careerGoalForm: CareerGoalForm =
      {
        location: this.formGroup.controls.location.value,
        occupation: occupation,
        degreeLevel: this.formGroup.controls.degreeLevel.value,
        degreeProgram: degreeProgram,
        retirementAge: this.formGroup.controls.retirementAge.value,
        isCareerGoalValid: this.formGroup.valid,
        careerGoalPathType: CareerGoalPathEnum.ExploreDegrees
      };

      this.formSubmissionEventEmitter.emit(careerGoalForm);
    }
  }

  private toCareerGoalForm(): CareerGoalForm
  {
    const careerGoal: CareerGoal = this.userProfileModel?.careerGoal;

    const location: SearchResultModel = (careerGoal?.location)
      ? { id: careerGoal.location.zipCode, name: careerGoal.location.cityName }
      : null;

    const occupation: SearchResultModel = (careerGoal?.occupation)
      ? { id: careerGoal.occupation.onetCode, name: careerGoal.occupation.title }
      : null;

    const degreeProgram: SearchResultModel = (careerGoal?.degreeProgram)
      ? { id: careerGoal.degreeProgram.cipCode, name: careerGoal.degreeProgram.cipTitle }
      : null;

    const careerGoalForm: CareerGoalForm =
    {
      location: location,
      occupation: occupation,
      degreeLevel: careerGoal?.degreeLevel,
      degreeProgram: degreeProgram,
      retirementAge: careerGoal?.retirementAge,
      isCareerGoalValid: false,
      careerGoalPathType: CareerGoalPathEnum.ExploreDegrees
    };

    return careerGoalForm;
  }

  private occupationListFromInstructionalProgram(): SearchResultModel[]
  {
    const list: Occupation[] = this.userProfileModel?.careerGoal.degreeProgram?.occupations;
    const occupation: Occupation = this.userProfileModel?.careerGoal.occupation;
    const results: SearchResultModel[] = [];

    if (list && list.length > 0)
    {
      list.map((item: Occupation) =>
      {
        const searchResultModel: SearchResultModel =
        {
          id: item.onetCode,
          name: (occupation && occupation.onetCode === item.onetCode) ? occupation.title : item.title
        };

        results.push(searchResultModel);
      });
    }

    return orderBy(results, ['name'], ['asc']);
  }
}
