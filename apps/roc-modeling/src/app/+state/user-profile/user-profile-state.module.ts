import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserProfileEffects } from './user-profile.effects';
import { UserProfileFacade } from './user-profile.facade';
import { userProfileReducer } from './user-profile.reducer';
import { USER_PROFILE_FEATURE_KEY } from './user-profile.state';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature
        (
          USER_PROFILE_FEATURE_KEY,
          userProfileReducer
        ),
      EffectsModule.forFeature([UserProfileEffects])
    ],
  declarations:
    [

    ],
  providers:
    [
      UserProfileFacade
    ]
})
export class UserProfileStateModule { }
