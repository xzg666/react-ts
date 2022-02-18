import React, { Component, useState } from 'react';
import styles from './index.less';
import { query } from '@/services/cart';
import { CartProductType } from '@/@types/Product';
import List, { UpdateProductType } from './List';
import { connect, history } from 'umi';
import { editCart } from '@/services/editCart';
import PayBar from './PayBar';
import { rootModelType } from '@/models/rootmodel';
import { ConnectPropsType } from '@/@types/connect';

interface CartState {
  data: CartProductType[];
}

class Cart extends Component<ConnectPropsType, CartState> {
  state: CartState = { data: [] };

  componentDidMount() {
    query().then((res) => {
      this.setState({ data: res.list.data });
    });
  }

  updateProduct = (newState: UpdateProductType) => {
    const { id, index, count, checked } = newState;
    let data = [...this.state.data];
    if (count === 0) {
      data.splice(index, 1);
    } else {
      Object.assign(data[index], newState);
    }
    this.setState({ data });

    // editCart({ id, count }).then((res) => {
    //   this.setState({ data });
    // });
  };

  checkedAllChange = (allChecked: boolean) => {
    let data = [...this.state.data];
    data.every((item) => (item.checked = allChecked)); //全选赋值
    this.setState({ data });
  };

  goPay = () => {
    const { dispatch } = this.props;
    let data = [...this.state.data];
    let checkData = data.filter((item) => item.checked);
    // console.log('check', checkData);
    dispatch({ type: 'cart/saveCart', payload: { data: checkData } });
    history.push('/confirmBill');
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.main}>
        <List data={data} updateProduct={this.updateProduct} />
        <PayBar
          data={data}
          checkedAllChange={this.checkedAllChange}
          goPay={this.goPay}
        />
      </div>
    );
  }
}

export default connect(({ cart }: rootModelType) => ({ cart }))(Cart);
