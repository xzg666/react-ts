import React, { Component } from 'react';
import styles from './index.less';
import { history, Link } from 'umi';
import { ProductType } from '@/@types/product';
import { Card, ListView, WingBlank, Icon } from 'antd-mobile';
import { PaginationType } from '@/@types/list';
import Tags from '@/component/Tags';
import classnames from 'classnames';

interface ListProps {
  data: ProductType[];
  pagination: PaginationType;
  queryList: Function;
}
interface ListState {
  dataSource: any;
}

export default class List extends Component<ListProps, ListState> {
  state: ListState = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1: any, r2: any) => r1 != r2,
    }), //数据初始化
  };

  onEndReached = () => {
    const { pagination } = this.props;
    if (pagination.pageNo < pagination.totalPage - 1) {
      this.props.queryList({
        pageNo: pagination.pageNo + 1,
      });
    } //刷到底部重新请求
  };

  componentDidMount() {
    this.props.queryList(); //初次请求拿数据
  }

  render() {
    const { dataSource } = this.state;
    const { data, pagination } = this.props;
    return (
      <Card full className={styles.main}>
        {data.length > 0 ? (
          <ListView
            dataSource={dataSource.cloneWithRows(data)}
            renderRow={(item) => Node(item)}
            pageSize={pagination.pageSize}
            initialListSize={pagination.pageSize}
            onEndReached={this.onEndReached} //刷到底部重新渲染
            useBodyScroll={true}
            renderFooter={() => (
              <div className="txtCenter">
                {pagination.pageNo < pagination.totalPage - 1 ? (
                  <Icon type="loading" />
                ) : (
                  <div>加载完毕</div>
                )}
              </div>
            )}
            onEndReachedThreshold={10}
          />
        ) : (
          <div className="txtCenter font14">暂无数据</div>
        )}
      </Card>
    );
  }
}

function Node({ img, title, price, tags, id }: ProductType) {
  return (
    <Link className={styles.node} to={'/product/' + id}>
      <div className={classnames(styles.imgBox, 'xyCenter')}>
        <img src={img} />
      </div>
      <WingBlank size="lg" className={styles.ctn}>
        <div className="twoRows">{title}</div>
        <div className={classnames(styles.priceBox, 'font16')}>
          <span className={styles.yuan}>￥</span>
          <span className={styles.price}>{price}</span>
        </div>
        <Tags tags={tags} />
      </WingBlank>
    </Link>
  );
}
