import { ActionReducerMap } from '@ngrx/store';

import * as fromItems from '../components/home/store/home.reducer';

export interface AppState {
  items: fromItems.State
}

export const appReducer: ActionReducerMap<AppState> = {
  items: fromItems.homeReducer
}