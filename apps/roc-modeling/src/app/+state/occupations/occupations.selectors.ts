import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OCCUPATIONS_FEATURE_KEY,
  State,
  OccupationsPartialState,
  occupationsAdapter
} from './occupations.reducer';

// Lookup the 'Occupations' feature state managed by NgRx
export const getOccupationsState = createFeatureSelector<
  OccupationsPartialState,
  State
>(OCCUPATIONS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
  selectIds
} = occupationsAdapter.getSelectors();

export const getOccupationsError = createSelector(
  getOccupationsState,
  (state: State) => state.error
);

export const getAllOccupations = createSelector(
  getOccupationsState,
  (state: State) => selectAll(state)
);

export const getOccupationsEntities = createSelector(
  getOccupationsState,
  (state: State) => selectEntities(state)
);

export const getOccupationsIds = createSelector(
  getOccupationsState,
  (state: State) => selectIds(state) as string[]
);

export const getOccupationById = (onetCode: string) =>
  createSelector(getOccupationsState, (state: State) => {
    return state.entities[onetCode];
  });
