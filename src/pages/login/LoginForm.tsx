import React, { useEffect } from 'react';
import { InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

interface LoginFormProps {
  form: {
    getFieldProps: Function;
    getFieldsValue: Function;
  };
  handelSumbit: Function;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, handelSumbit }) => {
  const { getFieldProps, getFieldsValue } = form;
  const submit = () => {
    //登录 搜集信息
    let value = getFieldsValue();
    // console.log('value', value);
    handelSumbit(value);
  };
  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <InputItem
        type="text"
        {...getFieldProps('name')}
        placeholder="请输入账号"
        clear
      >
        账号
      </InputItem>
      <InputItem
        type="password"
        placeholder="请输入密码"
        {...getFieldProps('password')}
        clear
        autoComplete="new-password"
      >
        密码
      </InputItem>
      <WhiteSpace size="lg" />
      <Button type="primary" onClick={submit}>
        登录
      </Button>
    </WingBlank>
  );
};

export default createForm()(LoginForm);
