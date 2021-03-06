import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DEV_REDUCERS, syncReducers, resetOnLogout, AppState } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';
import { storeFreeze } from 'ngrx-store-freeze';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrument({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  BrowserAnimationsModule,
  EffectsModule.forRoot([UserEffects]),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule,
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule
];

