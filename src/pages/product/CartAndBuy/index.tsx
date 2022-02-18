import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { CartModelState, rootModelType } from '@/models/rootmodel';
import { ProductType } from '@/@types/product';
import { editCart } from '@/services/editCart';

interface CartAndBuyProps {
  product: ProductType;
}

const CartAndBuy: React.FC<CartAndBuyProps> = ({ product }) => {
  const cart = useSelector<rootModelType, CartModelState>(({ cart }) => cart);
  const dispatch = useDispatch();

  const goPay = () => {
    dispatch({
      type: 'cart/saveCart',
      payload: {
        data: [{ ...product, count: 1, checked: true, img: product.imgs[0] }],
      },
    });
    history.push('/confirmBill');
  };

  const addToCart = () => {
    editCart({ id: product.id, increment: 1 }).then((res) => {
      Toast.success('已加入购物车！');
    });
  };
  console.log('cart', cart);

  const toMyCart = () => {
    history.push('/cart');
  };
  return (
    <div className={styles.main}>
      <div onClick={toMyCart} className={classnames(styles.cart)}>
        <span className="iconfont icon-3 font16"></span>
        <p className={styles.title}>购物车</p>
      </div>
      <div
        className={classnames(styles.addCart, styles.btn)}
        onClick={addToCart}
      >
        加入购物车
      </div>
      <div className={classnames(styles.buyNow, styles.btn)} onClick={goPay}>
        立即购买
      </div>
    </div>
  );
};

export default CartAndBuy;
