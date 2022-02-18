import { UserModelState } from './user';
import {CartModelState} from './cart'

export interface rootModelType {
  user: UserModelState;
  cart:CartModelState
}

export { UserModelState,CartModelState };
