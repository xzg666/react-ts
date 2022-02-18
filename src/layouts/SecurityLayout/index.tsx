import React, { useEffect, Children } from 'react';
import style from './index.less';
import { useSelector } from 'react-redux';
import { rootModelType, UserModelState } from '@/models/rootmodel';
import { Redirect, history } from 'umi';

interface SecurityLayoutProps {
  location: Location;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const { children, location } = props;
  const { currentUser } = useSelector<rootModelType, UserModelState>(
    ({ user }) => user,
  );
  const { userid } = currentUser;
  const isLogin = !!userid;

  if (!isLogin) {
    //没登录去登录页面，并且把当前路由传过去

    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  }

  return <div className={style.main}>{children}</div>;
};

export default SecurityLayout;
