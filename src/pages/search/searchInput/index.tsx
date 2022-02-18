import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { InputItem, Button } from 'antd-mobile';
import { query } from '@/services/search';

interface SearcInputhPageProps {
  queryList: Function;
}

const SearcInputhPage: React.FC<SearcInputhPageProps> = ({ queryList }) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [input, setInput] = useState('');

  const inputChange = (val: string) => {
    setInput(val);
    // console.log('val', val);
  };
  const [searchMode, setSearchMode] = useState(false);
  useEffect(() => {
    setSearchMode(input.trim() !== '');
  }, [input]);

  const handleSearch = useCallback(() => {
    if (searchMode) {
      const val = input.trim();
      console.log('search val', val);
      queryList({ searchKey: val, pageNo: 0 });
    } else {
      history.push('/');
    }
  }, [input, searchMode]); //用useCallback缓存函数

  return (
    <div className={styles.main}>
      <InputItem
        ref={inputRef}
        value={input}
        onChange={inputChange}
        clear
        className={styles.searchBar}
      />
      <Button
        type="primary"
        className={styles.btn}
        disabled={false}
        onClick={handleSearch}
      >
        {searchMode ? '搜索' : '取消'}
      </Button>
    </div>
  );
};

export default SearcInputhPage;
