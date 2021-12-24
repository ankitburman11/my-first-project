import { createAction, props } from '@ngrx/store';
import { GoldItem } from '../../../models/goldItem';
import { RateModel } from '../../../models/rate';
import { SilverItem } from '../../../models/silverItem';

export const addGoldItem = createAction(
  '[Home] Add Gold Item',
  props<{ payload: GoldItem }>()
);
export const clearGoldItem = createAction('[Home] Clear Gold Item');
export const addSilverItem = createAction(
  '[Home] Add Silver Item',
  props<{ payload: SilverItem }>()
);
export const clearSIlverItem = createAction('[Home] Clear Silver Item');
export const updateRate = createAction(
  '[Home] Update Rate',
  props<{ payload: RateModel }>()
);
