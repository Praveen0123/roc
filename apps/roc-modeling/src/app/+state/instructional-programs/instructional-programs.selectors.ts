import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INSTRUCTIONAL_PROGRAMS_FEATURE_KEY,
  State,
  InstructionalProgramsPartialState,
  instructionalProgramsAdapter
} from './instructional-programs.reducer';

// Lookup the 'InstructionalPrograms' feature state managed by NgRx
export const getInstructionalProgramsState = createFeatureSelector<
  InstructionalProgramsPartialState,
  State
>(INSTRUCTIONAL_PROGRAMS_FEATURE_KEY);

const {
  selectAll,
  selectEntities
} = instructionalProgramsAdapter.getSelectors();

export const getInstructionalProgramsLoaded = createSelector(
  getInstructionalProgramsState,
  (state: State) => state.loaded
);

export const getInstructionalProgramsError = createSelector(
  getInstructionalProgramsState,
  (state: State) => state.error
);

export const getAllInstructionalPrograms = createSelector(
  getInstructionalProgramsState,
  (state: State) => selectAll(state)
);

export const getInstructionalProgramsEntities = createSelector(
  getInstructionalProgramsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getInstructionalProgramsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getInstructionalProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
