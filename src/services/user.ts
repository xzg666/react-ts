import request from '@/utils/request';

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function fakeAccountLogout(): Promise<any> {
  return request('/api/logout');
}
