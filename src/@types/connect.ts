import { Location, Dispatch } from 'umi';
export interface ConnectPropsType {
  location?: Location & { state: { from: string } };
  dispatch: Dispatch;
}
