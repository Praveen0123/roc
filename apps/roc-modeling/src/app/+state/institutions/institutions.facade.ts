import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as fromInstitutions from './institutions.reducer';
import * as InstitutionsSelectors from './institutions.selectors';
import * as InstitutionsActions from './institutions.actions';


@Injectable({
  providedIn: 'root'
})
export class InstitutionsFacade
{
  readonly loaded$ = this.store.pipe(
    select(InstitutionsSelectors.getInstitutionsLoaded)
  );
  readonly allInstitutions$ = this.store.pipe(
    select(InstitutionsSelectors.getAllInstitutions)
  );

  readonly getOccupationById$ = (unitId: number) =>
    this.store.pipe(select(InstitutionsSelectors.getInstitutionById(unitId)));

  constructor(
    private store: Store<fromInstitutions.InstitutionsPartialState>
  ) { }

  loadInstitutions(unitIds: number[]): void
  {
    this.dispatch(
      InstitutionsActions.loadInstitutions({
        unitIds
      })
    );
  }

  dispatch(action: Action): void
  {
    this.store.dispatch(action);
  }
}
