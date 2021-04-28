import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { InstitutionsDataService } from './institutions-data.service';

import * as InstitutionsActions from './institutions.actions';
@Injectable()
export class InstitutionsEffects {
  loadInstitutions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstitutionsActions.loadInstitutions),
      switchMap(({ unitIds }) => {
        return this.institutionsDataService.institutionsByUnitIds(unitIds).pipe(
          map((institutions) => {
            return InstitutionsActions.loadInstitutionsSuccess({
              institutions
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private institutionsDataService: InstitutionsDataService
  ) {}
}
