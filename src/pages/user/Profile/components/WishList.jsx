import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';

import {
  Col,
  Row,
  Card,
  Input,
  Space,
  Button,
  Rate,
  Image,
  Typography,
  Skeleton,
  Select,
  Checkbox,
  Slider,
  Spin,
  notification,
  Tabs,
} from 'antd';
import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  ArrowsAltOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

import {
  getWishListAction,
  removeFromWishListAction,
} from '../../../../redux/actions';
import { ROUTER } from '../../../../constants/router';
import { COLOR } from '../../../../constants/theme';
import * as S from '../styles';

const WishList = ({ userInfo }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getWishListAction({ id: userInfo.data.id }));
  }, []);

  const { wishLists } = useSelector(state => state.wishListsReducer);

  const cakeList = wishLists.data.filter(item => item.product.categoryId !== 5);
  const drinkList = wishLists.data.filter(
    item => item.product.categoryId === 5
  );

  const handleRemoveFromWishList = product => {
    dispatch(
      removeFromWishListAction({
        id: product.id,
        userId: userInfo.data.id,
      })
    );
  };

  const renderCakeList = () =>
    cakeList.map(cake => {
      return (
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <S.ProductItemWrapper>
            <S.ProductItemContent>
              <S.ProductImageWrapper
                onClick={() =>
                  history.push({
                    pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                      id: cake.productId,
                    }),
                    state: cake,
                  })
                }
              >
                <img
                  src={cake.product.image}
                  alt="img"
                  style={{ height: '100%', width: 'auto', borderRadius: 4 }}
                />
              </S.ProductImageWrapper>

              <S.ProductDetailWrapper>
                <S.H3>{cake.product.name}</S.H3>
                <S.P>{cake.product.price.toLocaleString()} ₫</S.P>
                <Rate
                  disabled
                  allowHalf
                  value={cake.product.rating}
                  style={{ fontSize: 14 }}
                />
              </S.ProductDetailWrapper>
            </S.ProductItemContent>
            <S.ProductButton
              type="text"
              icon={
                <CloseOutlined
                  style={{ color: COLOR.PRIMARY }}
                  onClick={() => handleRemoveFromWishList(cake)}
                />
              }
            />
          </S.ProductItemWrapper>
        </Col>
      );
    });
  const renderDrinkList = () =>
    drinkList.map(drink => {
      return (
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <S.ProductItemWrapper>
            <S.ProductItemContent>
              <S.ProductImageWrapper
                onClick={() =>
                  history.push({
                    pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                      id: drink.productId,
                    }),
                    state: drink,
                  })
                }
              >
                <img
                  src={drink.product.image}
                  alt="img"
                  style={{ height: '100%', width: 'auto' }}
                />
              </S.ProductImageWrapper>

              <S.ProductDetailWrapper>
                <S.H3>{drink.product.name}</S.H3>
                <S.P>{drink.product.price.toLocaleString()} ₫</S.P>
                <Rate
                  disabled
                  allowHalf
                  value={drink.product.rating}
                  style={{ fontSize: 14 }}
                />
              </S.ProductDetailWrapper>
            </S.ProductItemContent>
            <S.ProductButton
              type="text"
              icon={
                <CloseOutlined
                  style={{ color: COLOR.PRIMARY }}
                  onClick={() => handleRemoveFromWishList(drink)}
                />
              }
            />
          </S.ProductItemWrapper>
        </Col>
      );
    });

  return (
    <Row>
      <Col span={24}>
        <S.TabsContainer>
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="Bánh" key="1">
              <Row gutter={[16, 16]}>{renderCakeList()}</Row>
            </TabPane>
            <TabPane tab="Nước uống" key="2">
              <Row gutter={[16, 16]}>{renderDrinkList()}</Row>
            </TabPane>
          </Tabs>
        </S.TabsContainer>
      </Col>
    </Row>
  );
};

export default WishList;
