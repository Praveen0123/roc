import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as InstitutionsActions from './institutions.actions';
import { InstitutionsEntity } from './institutions.models';

export const INSTITUTIONS_FEATURE_KEY = 'institutions';

export interface State extends EntityState<InstitutionsEntity> {
  loaded: boolean; // has the Institutions list been loaded
  error?: string | null; // last known error (if any)
}

export interface InstitutionsPartialState {
  readonly [INSTITUTIONS_FEATURE_KEY]: State;
}

export const institutionsAdapter: EntityAdapter<InstitutionsEntity> = createEntityAdapter<
  InstitutionsEntity
>({
  selectId: (institutionsEntity: InstitutionsEntity) =>
    institutionsEntity.unitId
});

export const initialState: State = institutionsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const institutionsReducer = createReducer(
  initialState,
  on(InstitutionsActions.loadInstitutionsSuccess, (state, { institutions }) =>
    institutionsAdapter.setAll(institutions, state)
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return institutionsReducer(state, action);
}
