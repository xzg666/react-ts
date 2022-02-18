import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'react-redux';
import { rootModelType, UserModelState } from '@/models/rootmodel';
import { Redirect, history } from 'umi';
import Header from './Header';
import MyList from './MyList';
import Logout from './Logout';

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = (props) => {
  const user = useSelector<rootModelType, UserModelState>(({ user }) => user);
  const dispatch = useDispatch();
  useEffect(() => {
    //发送请求
    dispatch({ type: 'user/queryDetail' });
  }, []);

  const { name, icon } = user.detail;

  const logout = () => {
    dispatch({ type: 'user/logout' });
  };

  return (
    <div>
      <Header name={name} icon={icon} />
      <MyList />
      <Logout logout={logout} />
    </div>
  );
};

export default UserPage;
