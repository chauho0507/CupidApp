import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import TopWrapper from '../../../components/TopWrapper';
import OrderHistory from './components/OrderHistory';
import Information from './components/Information';
import WishList from './components/WishList';

import { Card, Col, Row, Table, Avatar, Space, Button } from 'antd';
import {
  HistoryOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { getOrderListAction, logoutAction } from '../../../redux/actions';

import { COLOR } from '../../../constants/theme';
import { PROFILE_TABS } from './constants';
import { BREADCRUMB } from './constants';

import * as S from './styles';
import Location from './components/Location';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const { userInfo } = useSelector(state => state.authReducer);

  useEffect(() => {
    dispatch(getOrderListAction({ id: userInfo.data.id }));
  }, [userInfo.data]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
  };

  const renderProfileTab = () => {
    return PROFILE_TABS.map((tabItem, tabIndex) => (
      <S.TabItem
        key={`tab-${tabIndex}`}
        active={activeTab === tabItem.value}
        onClick={() => setActiveTab(tabItem.value)}
      >
        <Space size={12}>
          {tabItem.icon}
          {tabItem.title}
        </Space>
      </S.TabItem>
    ));
  };

  return (
    <>
      <TopWrapper titlePage="Cá nhân" breadcrumb={BREADCRUMB} height={150} />
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <Row gutter={16}>
            <Col span={5}>
              <S.LeftContainer>
                <S.AvatarContainer>
                  <Avatar size={180} icon={<UserOutlined />} />
                  <S.H1>{userInfo.data.fullName}</S.H1>
                </S.AvatarContainer>
                {renderProfileTab()}
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  danger
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </Button>
              </S.LeftContainer>
            </Col>
            <Col span={19}>
              <S.RightContainer>
                {activeTab === 0 && <Information userInfo={userInfo} />}
                {activeTab === 1 && <OrderHistory />}
                {activeTab === 2 && <WishList userInfo={userInfo} />}
                {activeTab === 3 && <Location userInfo={userInfo} />}
              </S.RightContainer>
            </Col>
          </Row>
        </S.ProfileContainer>
      </S.ProfileWrapper>
    </>
  );
};

export default ProfilePage;
