import { createAction, props } from '@ngrx/store';
import { OccupationsEntity } from './occupations.models';

export const addOccupation = createAction(
  '[Occupations] Add Current Occupation',
  props<{ occupation: OccupationsEntity }>()
);
