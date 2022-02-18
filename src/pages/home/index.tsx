import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'react-redux';
import { rootModelType, UserModelState } from '@/models/rootmodel';
import { history } from 'umi';
import SearchInput from './SearchInput/index';
import Carousel from './Carousel/index';
import NavTable from './NavTable/index';
import Arc from '@/component/Arc';
import Recommend from './Recommend';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const user = useSelector<rootModelType, UserModelState>(({ user }) => user);
  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <SearchInput />
      </div>

      <Carousel />
      <Arc />
      <NavTable />
      <Recommend />
    </div>
  );
};

export default HomePage;
