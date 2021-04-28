import { createAction, props } from '@ngrx/store';
import { InstitutionsEntity } from './institutions.models';

export const loadInstitutions = createAction(
  '[Institutions] Load Institutions',
  props<{ unitIds: number[] }>()
);

export const loadInstitutionsSuccess = createAction(
  '[Institutions] Load Institutions Success',
  props<{ institutions: InstitutionsEntity[] }>()
);

export const loadInstitutionsFailure = createAction(
  '[Institutions] Load Institutions Failure',
  props<{ error: any }>()
);

export const updateSelectedEntity = createAction(
  '[Institutions] Update Selected ID',
  props<{ institution: InstitutionsEntity }>()
);
