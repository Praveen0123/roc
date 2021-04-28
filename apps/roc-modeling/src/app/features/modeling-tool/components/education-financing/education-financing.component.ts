import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationFinancing, UserProfileModel } from '@app/+state/user-profile/user-profile.models';
import { CONFIG } from '@app/config/config';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'roc-education-financing',
  templateUrl: './education-financing.component.html',
  styleUrls: ['./education-financing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationFinancingComponent implements OnInit, OnDestroy, OnChanges
{
  private alive = true;

  @Input() userProfileModel: UserProfileModel;
  @Output('onEducationFinancingSubmitted') formSubmissionEventEmitter = new EventEmitter<EducationFinancing>();

  formGroup: FormGroup;

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


  private buildForm()
  {
    const educationFinancing: EducationFinancing = this.userProfileModel?.educationFinancing;

    this.formGroup = this.formBuilder.group
      ({
        isTaxDependent: [educationFinancing.isTaxDependent],
        outOfPocketAmount: [educationFinancing.outOfPocketAmount],
        federalLoanAmount: [educationFinancing.federalLoanAmount],
        privateLoanAmount: [educationFinancing.privateLoanAmount],
        yearsToPayOffFederalLoan: [educationFinancing.yearsToPayOffFederalLoan],
        yearsToPayOffPrivateLoan: [educationFinancing.yearsToPayOffPrivateLoan]
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
      const educationFinancing: EducationFinancing =
      {
        isTaxDependent: this.formGroup.controls.isTaxDependent.value,
        outOfPocketAmount: this.formGroup.controls.outOfPocketAmount.value,
        federalLoanAmount: this.formGroup.controls.federalLoanAmount.value,
        privateLoanAmount: this.formGroup.controls.privateLoanAmount.value,
        yearsToPayOffFederalLoan: this.formGroup.controls.yearsToPayOffFederalLoan.value,
        yearsToPayOffPrivateLoan: this.formGroup.controls.yearsToPayOffPrivateLoan.value
      };

      this.formSubmissionEventEmitter.emit(educationFinancing);
    }
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
