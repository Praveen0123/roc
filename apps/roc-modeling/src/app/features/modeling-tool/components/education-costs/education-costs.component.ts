import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationCost, EducationCostForm, UserProfileModel } from '@app/+state/user-profile/user-profile.models';
import { CONFIG } from '@app/config/config';
import { IncomeRangeEnum } from '@app/core/models/enums';
import { AutoCompleteTypeEnum, SearchResultModel } from '@vantage-point/auto-complete-textbox';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'roc-education-costs',
  templateUrl: './education-costs.component.html',
  styleUrls: ['./education-costs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationCostsComponent implements OnInit, OnDestroy, OnChanges
{
  private alive = true;

  @Input() userProfileModel: UserProfileModel;
  @Output('onEducationCostSubmitted') formSubmissionEventEmitter = new EventEmitter<EducationCostForm>();

  formGroup: FormGroup;
  autoCompleteTypeEnum: typeof AutoCompleteTypeEnum = AutoCompleteTypeEnum;
  incomeRangeEnum: IncomeRangeEnum[] = IncomeRangeEnum.getOrderedList();

  defaultYearsToCompleteMinimum: number = CONFIG.EDUCATION_COST.YEARS_TO_COMPLETE_MINIMUM;
  defaultYearsToCompleteMaximum: number = CONFIG.EDUCATION_COST.YEARS_TO_COMPLETE_MAXIMUM;
  startYearList: number[];

  constructor
    (
      private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void
  {
    this.buildForm();

    this.startYearList = this.getYearList();
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.userProfileModel && !changes.userProfileModel.firstChange)
    {
      this.buildForm();
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

  compareIncomeRangeFunction(option: IncomeRangeEnum, selectedItem: IncomeRangeEnum): boolean
  {
    return (option && selectedItem) ? option.value === selectedItem.value : false;
  }


  private buildForm()
  {
    const educationCostForm: EducationCostForm = this.toEducationCostForm();

    this.formGroup = this.formBuilder.group
      ({
        institution: [educationCostForm.institution, Validators.required],
        startYear: [educationCostForm.startYear],
        incomeRange: [educationCostForm.incomeRange],
        isFulltime: [educationCostForm.isFulltime],
        yearsToCompleteDegree: [educationCostForm.yearsToCompleteDegree]
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
      const educationCostForm: EducationCostForm =
      {
        institution: this.formGroup.controls.institution.value,
        startYear: this.formGroup.controls.startYear.value,
        incomeRange: this.formGroup.controls.incomeRange.value,
        isFulltime: this.formGroup.controls.isFulltime.value,
        yearsToCompleteDegree: this.formGroup.controls.yearsToCompleteDegree.value,
        isEducationCostValid: this.formGroup.valid
      };

      this.formSubmissionEventEmitter.emit(educationCostForm);
    }
  }

  private toEducationCostForm(): EducationCostForm
  {
    const educationCost: EducationCost = this.userProfileModel?.educationCost;

    const institution: SearchResultModel = (educationCost?.institution)
      ? { id: educationCost.institution.opeId, name: educationCost.institution.name }
      : null;

    const educationCostForm: EducationCostForm =
    {
      institution: institution,
      startYear: educationCost?.startYear,
      incomeRange: educationCost?.incomeRange,
      isFulltime: educationCost?.isFulltime,
      yearsToCompleteDegree: educationCost?.yearsToCompleteDegree,
      isEducationCostValid: false
    };

    return educationCostForm;
  }

  private getYearList(): number[]
  {
    const currentYear: number = new Date().getFullYear();

    return this.range(currentYear, currentYear + 4);
  }

  private range(start: number, end: number)
  {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }
}
