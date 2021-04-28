import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { RocChartPopoverData } from '@models/roc';
import { OccupationsEntity } from '@state/occupations/occupations.models';

@Component({
  selector: 'roc-lifetime-earnings-popover',
  templateUrl: './lifetime-earnings-popover.component.html',
  styleUrls: ['./lifetime-earnings-popover.component.scss'],
})
export class LifetimeEarningsPopoverComponent implements OnInit
{
  constructor(
    public dialogRef: MatDialogRef<LifetimeEarningsPopoverComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      rocChartPopoverData: RocChartPopoverData;
      currentStateOccupation: OccupationsEntity;
      goalStateOccupation: OccupationsEntity;
    }
  ) { }

  closeIcon = faTimes;

  ngOnInit(): void { }

  closeDialog(): void
  {
    this.dialogRef.close();
  }
}
