import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as OccupationsActions from './occupations.actions';
import { OccupationsEntity } from './occupations.models';

export const OCCUPATIONS_FEATURE_KEY = 'occupations';

export interface State extends EntityState<OccupationsEntity> {
  error?: string | null; // last known error (if any)
}

export interface OccupationsPartialState {
  readonly [OCCUPATIONS_FEATURE_KEY]: State;
}

export const occupationsAdapter: EntityAdapter<OccupationsEntity> = createEntityAdapter<
  OccupationsEntity
>({
  selectId: (occupationsEntity: OccupationsEntity) =>
    occupationsEntity.onetCode,
  sortComparer: false
});

export const initialState: State = occupationsAdapter.getInitialState({
  // set initial required properties
  error: null
});

const occupationsReducer = createReducer(
  initialState,
  on(OccupationsActions.addOccupation, (state, { occupation }) => {
    return occupationsAdapter.addOne(occupation, state);
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return occupationsReducer(state, action);
}
