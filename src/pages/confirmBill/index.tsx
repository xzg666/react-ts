import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'react-redux';
import { rootModelType, CartModelState } from '@/models/rootmodel';
import { getDefaultReceivingInfo } from '@/services/confirmBill';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import ReceivingInfo, { ReceivingInfoType } from './ReceivingInfo';
import ListNode from './ListNode';
import PayBar from './PayBar';

interface ConfirmBillPageProps {}

const ConfirmBillPage: React.FC<ConfirmBillPageProps> = (props) => {
  const cart = useSelector<rootModelType, CartModelState>(({ cart }) => cart);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<ReceivingInfoType>({
    name: '',
    tel: '',
    address: '',
  });
  const [payBarProps, setPayBarProps] = useState({
    totalPrice: 0,
    allCount: 0,
  });
  useEffect(() => {
    getDefaultReceivingInfo().then((res) => {
      setUserInfo({ ...res });
    });
    console.log('cart', cart.data);
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    cart.data.forEach((item) => {
      totalPrice += item.count * item.price;
    });
    let allCount = cart.data.length;
    setPayBarProps({ totalPrice, allCount });
  }, []);

  return (
    <div className={styles.main}>
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <ReceivingInfo {...userInfo} />
        <WhiteSpace size="lg" />
        {cart.data.map((item) => {
          return (
            <div key={item.id}>
              <ListNode {...item} />
            </div>
          );
        })}
        <PayBar
          totalPrice={payBarProps.totalPrice}
          count={payBarProps.allCount}
        />
      </WingBlank>
    </div>
  );
};

export default ConfirmBillPage;
