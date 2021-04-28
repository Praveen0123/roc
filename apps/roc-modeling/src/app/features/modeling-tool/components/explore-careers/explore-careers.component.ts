import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerGoal, CareerGoalForm, CareerGoalPathEnum, UserProfileModel } from '@app/+state/user-profile/user-profile.models';
import { CONFIG } from '@app/config/config';
import { InstructionalProgram } from '@gql';
import { EducationLevelEnum } from '@models/enums';
import { AutoCompleteTypeEnum, SearchResultModel } from '@vantage-point/auto-complete-textbox';
import orderBy from 'lodash.orderby';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'roc-explore-careers',
  templateUrl: './explore-careers.component.html',
  styleUrls: ['./explore-careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreCareersComponent implements OnInit, OnDestroy, OnChanges
{
  private alive = true;

  @Input() userProfileModel: UserProfileModel;
  @Output('onExploreCareersSubmitted') formSubmissionEventEmitter = new EventEmitter<CareerGoalForm>();

  formGroup: FormGroup;
  autoCompleteTypeEnum: typeof AutoCompleteTypeEnum = AutoCompleteTypeEnum;

  availableEducationLevel: EducationLevelEnum[];
  retirementAgeMinimum: number = CONFIG.USER_PROFILE.RETIREMENT_AGE_MINIMUM;
  retirementAgeMaximum: number = CONFIG.USER_PROFILE.RETIREMENT_AGE_MAXIMUM;
  instructionalProgramList: SearchResultModel[];


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

  compareDegreeProgramFunction(option: SearchResultModel, selectedItem: SearchResultModel): boolean
  {
    return (option && selectedItem) ? option.id === selectedItem.id : false;
  }


  private initialize()
  {
    this.availableEducationLevel = EducationLevelEnum.getEducationLevelGoalOptions();
    this.instructionalProgramList = this.instructionalProgramListFromOccupation();

    this.buildForm();
  }

  private buildForm()
  {
    const careerGoalForm: CareerGoalForm = this.toCareerGoalForm();

    this.formGroup = this.formBuilder.group
      ({
        location: [careerGoalForm.location],
        occupation: [careerGoalForm.occupation, Validators.required],
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
      const occupation: SearchResultModel = this.formGroup.controls.occupation.value;
      const degreeProgram: SearchResultModel = (occupation === null) ? null : this.formGroup.controls.degreeProgram.value;

      const careerGoalForm: CareerGoalForm =
      {
        location: this.formGroup.controls.location.value,
        occupation: occupation,
        degreeLevel: this.formGroup.controls.degreeLevel.value,
        degreeProgram: degreeProgram,
        retirementAge: this.formGroup.controls.retirementAge.value,
        isCareerGoalValid: this.formGroup.valid,
        careerGoalPathType: CareerGoalPathEnum.ExploreCareers
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
      careerGoalPathType: CareerGoalPathEnum.ExploreCareers
    };

    return careerGoalForm;
  }

  private instructionalProgramListFromOccupation(): SearchResultModel[]
  {
    const list: InstructionalProgram[] = this.userProfileModel?.careerGoal.occupation?.instructionalProgramList;
    const results: SearchResultModel[] = [];

    if (list && list.length > 0)
    {
      list.map((item: InstructionalProgram) =>
      {
        const searchResultModel: SearchResultModel =
        {
          id: item.cipCode,
          name: item.cipTitle
        };

        results.push(searchResultModel);
      });
    }

    return orderBy(results, ['name'], ['asc']);
  }
}
