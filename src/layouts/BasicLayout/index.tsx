import React, { useEffect, Children } from 'react';
import BottomNav from '@/component/BottomNav/index';
import '@/static/iconfont/iconfont.css';
import style from './index.less';
import { useSelector, useDispatch } from 'react-redux';
import { rootModelType, UserModelState } from '@/models/rootmodel';
import { history } from 'umi';

interface BasicLayoutProps {
  location: Location;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, location } = props;
  const { pathname } = location;
  const user = useSelector<rootModelType, UserModelState>(({ user }) => user);
  const dispatch = useDispatch();
  console.log('pathname', pathname);

  useEffect(() => {
    //获取用户信息
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const showVBottomNav = history.location.pathname !== '/login';

  return (
    <div className={style.main}>
      <article>{children}</article>
      <footer>{showVBottomNav && <BottomNav pathname={pathname} />}</footer>
    </div>
  );
};

export default BasicLayout;
