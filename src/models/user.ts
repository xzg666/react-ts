import { Effect, Reducer } from 'umi';
import { fakeAccountLogout, queryCurrent } from '@/services/user';
import { fakeAccountLogin, queryDetail } from '@/services/login';
import { Toast } from 'antd-mobile';

export interface CurrentUser {
  name?: string;
  icon?: string;
  userid?: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
  detail: any;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    login: Effect;
    queryDetail: Effect;
    logout: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    detail: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveUser',
        payload: { currentUser: { ...response } },
      });
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === 1) {
        yield put({
          type: 'saveUser',
          payload: { currentUser: { ...response } },
        });
      } else {
        Toast.fail(response.msg || '系统开小差，请稍后再试~');
      }
    },
    *queryDetail(_, { call, put }) {
      const response = yield call(queryDetail);
      yield put({ type: 'saveUser', payload: { detail: { ...response } } });
    },
    *logout(_, { call, put }) {
      const response = yield call(fakeAccountLogout);
      yield put({
        type: 'clearUser',
        payload: { currentUser: {}, detail: {} },
      });
    },
  },
  reducers: {
    saveUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default UserModel;
