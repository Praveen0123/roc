import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as InstructionalProgramsActions from './instructional-programs.actions';
import { InstructionalProgramsEntity } from './instructional-programs.models';

export const INSTRUCTIONAL_PROGRAMS_FEATURE_KEY = 'instructionalPrograms';

export interface State extends EntityState<InstructionalProgramsEntity> {
  selectedId?: string | number; // which InstructionalPrograms record has been selected
  loaded: boolean; // has the InstructionalPrograms list been loaded
  error?: string | null; // last known error (if any)
}

export interface InstructionalProgramsPartialState {
  readonly [INSTRUCTIONAL_PROGRAMS_FEATURE_KEY]: State;
}

export const instructionalProgramsAdapter: EntityAdapter<InstructionalProgramsEntity> = createEntityAdapter<
  InstructionalProgramsEntity
>({
  selectId: (instructionalProgramsEntity: InstructionalProgramsEntity) =>
    instructionalProgramsEntity.cipCode +
    '_' +
    instructionalProgramsEntity.degreeLevel
});

export const initialState: State = instructionalProgramsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
    selectedId: null
  }
);

const instructionalProgramsReducer = createReducer(
  initialState,
  on(
    InstructionalProgramsActions.loadInstructionalProgramsSuccess,
    (state, { instructionalPrograms }) =>
      instructionalProgramsAdapter.setAll(instructionalPrograms, state)
  ),
  on(
    InstructionalProgramsActions.updateSelectedEntity,
    (state, { instructionalProgram }) => {
      return {
        ...state,
        selectedId:
          instructionalProgram.cipCode + '_' + instructionalProgram.degreeLevel
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return instructionalProgramsReducer(state, action);
}
