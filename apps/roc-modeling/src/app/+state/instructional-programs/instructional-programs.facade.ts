import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { InstructionalProgramsEntity } from './instructional-programs.models';

import * as fromInstructionalPrograms from './instructional-programs.reducer';
import * as InstructionalProgramsSelectors from './instructional-programs.selectors';
import * as InstructionalProgramsActions from './instructional-programs.actions';

@Injectable({
  providedIn: 'root'
})
export class InstructionalProgramsFacade {
  allInstructionalPrograms$ = this.store.pipe(
    select(InstructionalProgramsSelectors.getAllInstructionalPrograms)
  );

  selectedInstructionalProgram$ = this.store.pipe(
    select(InstructionalProgramsSelectors.getSelected)
  );

  constructor(
    private store: Store<
      fromInstructionalPrograms.InstructionalProgramsPartialState
    >
  ) {}

  loadInstructionalPrograms(socCode: string): void {
    this.dispatch(
      InstructionalProgramsActions.loadInstructionalPrograms({
        socCode
      })
    );
  }

  updateSelectedInstructionalProgram(
    instructionalProgram: InstructionalProgramsEntity
  ): void {
    this.dispatch(
      InstructionalProgramsActions.updateSelectedEntity({
        instructionalProgram
      })
    );
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
