import Page from '../Page';
import { useState } from 'react';
import './index.scss'
import { NavBar } from 'react-vant';

const Setting: React.FC = () => {
  
  return (
    // 页面
    <Page>
      <NavBar title={'设置'}/>
    </Page>
  );
};

export default Setting;
