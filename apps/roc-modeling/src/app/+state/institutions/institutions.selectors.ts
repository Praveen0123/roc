import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INSTITUTIONS_FEATURE_KEY,
  State,
  InstitutionsPartialState,
  institutionsAdapter
} from './institutions.reducer';

// Lookup the 'Institutions' feature state managed by NgRx
export const getInstitutionsState = createFeatureSelector<
  InstitutionsPartialState,
  State
>(INSTITUTIONS_FEATURE_KEY);

const { selectAll, selectEntities } = institutionsAdapter.getSelectors();

export const getInstitutionsLoaded = createSelector(
  getInstitutionsState,
  (state: State) => state.loaded
);

export const getInstitutionsError = createSelector(
  getInstitutionsState,
  (state: State) => state.error
);

export const getAllInstitutions = createSelector(
  getInstitutionsState,
  (state: State) => selectAll(state)
);

export const getInstitutionsEntities = createSelector(
  getInstitutionsState,
  (state: State) => selectEntities(state)
);

export const getInstitutionById = (unitId: number) =>
  createSelector(getInstitutionsState, (state: State) => {
    return state.entities[unitId];
  });
