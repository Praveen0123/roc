import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { OccupationsEntity } from './occupations.models';
import * as fromOccupations from './occupations.reducer';
import * as OccupationsSelectors from './occupations.selectors';
import * as OccupationsActions from './occupations.actions';

@Injectable()
export class OccupationsFacade {
  constructor(private store: Store<fromOccupations.OccupationsPartialState>) {}

  readonly getOccupationById$ = (onetCode: string) =>
    this.store.pipe(select(OccupationsSelectors.getOccupationById(onetCode)));

  addOccupation(occupation: OccupationsEntity): void {
    this.dispatch(
      OccupationsActions.addOccupation({
        occupation
      })
    );
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
