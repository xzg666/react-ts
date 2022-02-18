import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'react-redux';
import { rootModelType, UserModelState } from '@/models/rootmodel';
import { Redirect, history } from 'umi';
import LoginForm from './loginForm';

interface LoginPageProps {
  location: Location & { state: { from: '' } };
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const { location } = props;
  const user = useSelector<rootModelType, UserModelState>(({ user }) => user);
  const dispatch = useDispatch();
  const { userid } = user.currentUser;
  const isLogin = !!userid;
  const handelSumbit = (value: LoginPageProps) => {
    //发送请求
    dispatch({ type: 'user/login', payload: value });
  };
  if (isLogin) {
    // const { from = '/' } = location.state || {};
    let from = location.state?.from ?? '/';
    console.log('from', from, 'state', history.location.state);
    return <Redirect to={from} />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.logo}></div>
      <LoginForm handelSumbit={handelSumbit} />
    </div>
  );
};

export default LoginPage;
