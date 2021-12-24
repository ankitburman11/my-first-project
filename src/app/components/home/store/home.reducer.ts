import { createReducer, on } from '@ngrx/store';
import { GoldItem } from '../../../models/goldItem';
import { RateModel } from '../../../models/rate';
import { SilverItem } from '../../../models/silverItem';
import * as HomeActions from './home.action';

export interface State {
  goldState: GoldItem[];
  rate: RateModel;
  silverState: SilverItem[];
}

export const initialState: State = {
  goldState: [],
  rate: { goldHallmark: 0, goldKdm: 0, silver: 0, diamond: 0 },
  silverState: [],
};

const _homeReducer = createReducer(
  initialState,
  on(HomeActions.addGoldItem, (state, action) => {
    console.log(action);
    return {
      ...state,
      goldState: [{ ...action.payload }],
    };
  }),
  on(HomeActions.updateRate, (state, action) => {
    console.log(action);
    return {
      ...state,
      rate: { ...state.rate, ...action.payload },
    };
  })
);

export function homeReducer(state: any, action: any) {
  return _homeReducer(state, action);
}
