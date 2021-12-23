import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TopWrapper from '../../../components/TopWrapper';
import OrderHistory from './components/OrderHistory';
import Information from './components/Information';
import WishList from './components/WishList';

import { Col, Row, Avatar, Space, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { getOrderListAction, logoutAction } from '../../../redux/actions';

import { PROFILE_TABS } from './constants';
import { BREADCRUMB } from './constants';

import * as S from './styles';
import OrderLocation from './components/OrderLocation';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const { userInfo } = useSelector(state => state.authReducer);

  useEffect(() => {
    dispatch(getOrderListAction({ userId: userInfo.data.id }));
  }, [userInfo.data.id, dispatch]);

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
                  <Avatar
                    size={{ xs: 80, sm: 100, md: 130, lg: 160, xl: 180 }}
                    src={userInfo.data.avatar}
                    icon={<UserOutlined />}
                  />
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
                {activeTab === 3 && <OrderLocation userInfo={userInfo} />}
              </S.RightContainer>
            </Col>
          </Row>
        </S.ProfileContainer>
      </S.ProfileWrapper>
    </>
  );
};

export default ProfilePage;
