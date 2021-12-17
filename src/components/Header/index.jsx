import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Menu,
  Badge,
  Avatar,
  Row,
  Col,
  Drawer,
  Divider,
  Image,
  notification,
} from 'antd';
import {
  MenuUnfoldOutlined,
  UserOutlined,
  LoadingOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GooglePlusOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { logoutAction, toggleSidebarAction } from '../../redux/actions';
import { ROUTER } from '../../constants/router';
import cupidLogo from '../../assets/img/cupid-logo-3.png';
import sidebarImg from '../../assets/img/sidebar.jpg';

import * as S from './styles';
import { COLOR } from '../../constants/theme';

const HEADER_ITEMS = [
  {
    title: 'Trang chủ',
    path: ROUTER.USER.HOME,
  },
  {
    title: 'Giới thiệu',
    path: ROUTER.USER.INTRODUCTION,
  },
  {
    title: 'Sản phẩm',
    path: ROUTER.USER.PRODUCT_LIST,
  },
  {
    title: 'Khuyến mãi',
    path: ROUTER.USER.TERMS,
  },
  {
    title: 'Bài viết',
    path: ROUTER.USER.BLOGS,
  },
];

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const { isShowSidebar } = useSelector(state => state.commonReducer);

  const handleCloseSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0 && isTop) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { userInfo } = useSelector(state => state.authReducer);
  const { cartList } = useSelector(state => state.cartReducer);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
  };

  const handleCheckInfo = () => {
    const userAccount = JSON.parse(localStorage.getItem('userInfo'));
    if (!userAccount)
      notification.warning({
        message: 'Bạn cần đăng nhập để thực hiện chức năng này!',
        placement: 'bottomRight',
      });
    else history.push(ROUTER.USER.CART);
  };

  const renderHeaderItem = () => {
    return HEADER_ITEMS.map((item, idx) => (
      <S.HeaderItem
        key={idx}
        item={item}
        location={location}
        onClick={() => history.push(item.path)}
      >
        <S.Span>{item.title}</S.Span>
      </S.HeaderItem>
    ));
  };

  return (
    <S.HeaderContainer isTop={isTop}>
      <Drawer
        placement="left"
        onClose={handleCloseSidebar}
        visible={isShowSidebar}
      >
        <S.SidebarNav>{renderHeaderItem()}</S.SidebarNav>
        <Divider style={{ borderColor: COLOR.SECONDARY }} />
        <Image preview={false} src={sidebarImg} alt="sidebar-img" />
        <Divider style={{ borderColor: COLOR.SECONDARY }} />
      </Drawer>
      <S.HeaderSpace>
        <S.SpaceItem>
          <PhoneOutlined /> + (1800) 6868 &nbsp;&nbsp;&nbsp;
          <MailOutlined /> cupidBakery@gmail.com
        </S.SpaceItem>
        <S.SpaceItem>
          <S.Logo>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
            <GooglePlusOutlined />
          </S.Logo>
        </S.SpaceItem>
      </S.HeaderSpace>
      <S.HeaderContent>
        <S.HeaderMenu>
          <Button
            type="text"
            icon={
              <MenuUnfoldOutlined
                style={{ fontSize: 24, color: COLOR.PRIMARY }}
              />
            }
            onClick={() => dispatch(toggleSidebarAction())}
          />
        </S.HeaderMenu>
        <S.HeaderLogo>
          <img
            style={{
              height: 'auto',
              width: '100%',
            }}
            src={cupidLogo}
            alt="logo"
            onClick={() => history.push(ROUTER.USER.HOME)}
          />
        </S.HeaderLogo>
        <S.HeaderNav>{renderHeaderItem()}</S.HeaderNav>

        <S.HeaderUser>
          {userInfo.loading ? (
            <LoadingOutlined spin />
          ) : userInfo.data?.email ? (
            <Row align="middle">
              <S.HeaderUserCart>
                <Badge count={cartList.data.length}>
                  <Button
                    shape="circle"
                    size="large"
                    type="primary"
                    ghost
                    icon={
                      <ShoppingCartOutlined
                        style={{
                          fontSize: '1.6rem',
                        }}
                      />
                    }
                    onClick={() => history.push(ROUTER.USER.CART)}
                  ></Button>
                </Badge>
              </S.HeaderUserCart>
              <Dropdown
                overlay={
                  <Menu style={{ cursor: 'pointer' }}>
                    <Menu.Item
                      key="0"
                      onClick={() => history.push(ROUTER.USER.PROFILE)}
                      icon={<InfoCircleOutlined />}
                    >
                      Thông tin của bạn
                    </Menu.Item>

                    <Menu.Item
                      key="1"
                      onClick={() => history.push(ROUTER.USER.CART)}
                      icon={<ShoppingOutlined />}
                    >
                      Giỏ hàng
                    </Menu.Item>

                    <Menu.Item
                      key="2"
                      danger
                      onClick={logoutHandler}
                      icon={<LogoutOutlined />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <Avatar
                  shape="circle"
                  size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 60 }}
                  icon={<UserOutlined />}
                  style={{ marginLeft: 12, cursor: 'pointer' }}
                />
              </Dropdown>
            </Row>
          ) : (
            <Row align="middle">
              <Button
                shape="circle"
                size="large"
                type="primary"
                ghost
                icon={
                  <ShoppingCartOutlined
                    style={{
                      fontSize: 26,
                    }}
                  />
                }
                onClick={() => handleCheckInfo()}
              ></Button>
              <Button
                size="large"
                shape="round"
                type="primary"
                onClick={() => history.push(ROUTER.LOGIN)}
                style={{ marginLeft: 5 }}
              >
                Đăng nhập
              </Button>
            </Row>
          )}
        </S.HeaderUser>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;
