import { createAction, props } from '@ngrx/store';
import { InstructionalProgramsEntity } from './instructional-programs.models';

export const loadInstructionalPrograms = createAction(
  '[InstructionalPrograms] Load Instructional Program',
  props<{
    socCode: string;
  }>()
);
export const loadInstructionalProgramsSuccess = createAction(
  '[InstructionalPrograms] Load Instructional Programs Success',
  props<{
    instructionalPrograms: InstructionalProgramsEntity[];
  }>()
);
export const loadInstructionalProgramsFailure = createAction(
  '[InstructionalPrograms] Load Instructional Programs Failure',
  props<{ error: any }>()
);

export const updateSelectedEntity = createAction(
  '[InstructionalPrograms] Update Selected ID',
  props<{ instructionalProgram: InstructionalProgramsEntity }>()
);
