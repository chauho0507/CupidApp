import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';
import TopWrapper from '../../../components/TopWrapper';
import Slider from 'react-slick';
import moment from 'moment';

import {
  Space,
  Col,
  Row,
  Skeleton,
  Image,
  Button,
  Card,
  Tabs,
  List,
  Comment,
  Rate,
  Form,
  Input,
  Typography,
  Descriptions,
  notification,
  Radio,
  InputNumber,
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ProfileOutlined,
  CommentOutlined,
  HeartFilled,
} from '@ant-design/icons';

import {
  getProductDetailAction,
  getCategoryDetailAction,
  postCommentAction,
  getCommentListAction,
  addToCartAction,
  updateCartProductAction,
  getWishListAction,
  addToWishListAction,
  removeFromWishListAction,
} from '../../../redux/actions';
import { BREADCRUMB } from './constants';
import { ROUTER } from '../../../constants/router';
import { COLOR } from '../../../constants/theme';

import fallbackImg from '../../../assets/img/fallback.png';

import * as S from './styles';

const ProductDetailPage = ({ match, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = match.params?.id;
  const [commentForm] = Form.useForm();
  const { categoryId } = props.location.state;
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const { userInfo } = useSelector(state => state.authReducer);
  const { wishLists } = useSelector(state => state.wishListsReducer);
  const { commentList } = useSelector(state => state.commentReducer);
  const { productDetail } = useSelector(state => state.productReducer);
  const { categoryDetail } = useSelector(state => state.categoryReducer);
  const { cartList, actionLoading } = useSelector(state => state.cartReducer);
  const isLike =
    wishLists.data.findIndex(item => item.productId === parseInt(id)) !== -1;

  const { data } = productDetail;
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetailAction({ id: parseInt(id) }));
      dispatch(getCommentListAction({ productId: parseInt(id) }));
      dispatch(getWishListAction({ userId: userInfo.data.id, productId: id }));
    }
    if (categoryId) {
      dispatch(
        getCategoryDetailAction({
          id: parseInt(categoryId),
        })
      );
    }
  }, [id]);

  const renderProductRate = () => {
    let total = 0;
    commentList.data.forEach(item => {
      total = total + item.rating;
    });
    return (total / commentList.data.length).toFixed(1);
  };

  const getProductOptions = useMemo(() => {
    if (productDetail.data.productOptions?.length) {
      return productDetail.data.productOptions.map(option => {
        return (
          <Radio.Button key={option.id} value={option}>
            {option.name}
          </Radio.Button>
        );
      });
    }
  }, [productDetail.data]);

  const handleSubmitComment = values => {
    const isExist =
      commentList.data.findIndex(item => item.userId === userInfo.data.id) !==
      -1;
    if (isExist) {
      notification.warning({
        message: 'Bạn đã bình luận',
        placement: 'bottomRight',
      });
    } else {
      dispatch(
        postCommentAction({
          ...values,
          productId: parseInt(id),
          userId: userInfo.data.id,
        })
      );
      commentForm.resetFields();
    }
  };

  const handleAddToCart = () => {
    if (userInfo.data.email) {
      if (productDetail.data.productOptions?.length > 1) {
        if (!selectedOption) {
          notification.error({
            message: 'Hãy chọn một kích cỡ!',
            placement: 'bottomRight',
          });
        } else {
          const existCartProduct = cartList.data.find(
            item => item.productOptionId === selectedOption.id
          );
          if (existCartProduct) {
            dispatch(
              updateCartProductAction({
                data: {
                  id: existCartProduct.id,
                  quantity: existCartProduct.quantity + productQuantity,
                },
                callback: {
                  showSuccess: () =>
                    notification.success({
                      message: 'Cập nhật số lượng thành công!',
                      placement: 'bottomRight',
                    }),
                },
              })
            );
          } else {
            dispatch(
              addToCartAction({
                quantity: productQuantity,
                productId: parseInt(id),
                userId: userInfo.data.id,
                productOptionId: selectedOption.id,
              })
            );
          }
        }
      } else {
        const existCartProduct = cartList.data.find(
          item => item.productId === parseInt(id)
        );
        if (existCartProduct) {
          dispatch(
            updateCartProductAction({
              data: {
                id: existCartProduct.id,
                quantity: existCartProduct.quantity + productQuantity,
              },
              callback: {
                showSuccess: () =>
                  notification.success({
                    message: 'Cập nhật số lượng thành công!',
                    placement: 'bottomRight',
                  }),
              },
            })
          );
        } else {
          dispatch(
            addToCartAction({
              quantity: productQuantity,
              productId: parseInt(id),
              userId: userInfo.data.id,
              productOptionId: productDetail.data.productOptions[0].id,
            })
          );
        }
      }
    } else {
      notification.error({
        message: 'Thông báo',
        description: 'Bạn cần đăng nhập để thực hiện chức năng này!',
        placement: 'bottomRight',
      });
    }
  };

  const handleWishList = () => {
    if (isLike) {
      const wish = wishLists.data.find(item => item.productId === parseInt(id));
      dispatch(
        removeFromWishListAction({ id: wish.id, userId: userInfo.data.id })
      );
    } else
      dispatch(
        addToWishListAction({
          userId: userInfo.data.id,
          productId: parseInt(id),
        })
      );
  };

  const renderProductDetail = useMemo(() => {
    return (
      <>
        <Card>
          <S.CustomRow gutter={[30, 30]} justify="center">
            <Col
              sm={{ span: 24, order: 1 }}
              md={{ span: 14, order: 1 }}
              lg={{ span: 14, order: 1 }}
            >
              {productDetail.loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
                <Image
                  fallback={fallbackImg}
                  style={{
                    borderRadius: '4px',
                    objectFit: 'cover',
                    width: '100%',
                  }}
                  src={data.image}
                  alt="img"
                />
              )}
            </Col>
            <Col
              sm={{ span: 20, order: 2 }}
              md={{ span: 10, order: 2 }}
              lg={{ span: 10, order: 1 }}
            >
              {productDetail.loading ? (
                <Skeleton active />
              ) : (
                <S.ProductDetailDescription>
                  <div>
                    <S.H1>{data.name}</S.H1>
                    <Rate
                      disabled
                      style={{ fontSize: 18, paddingBottom: 10 }}
                      // character={<HeartFilled style={{ fontSize: 18 }} />}
                      value={renderProductRate()}
                    ></Rate>
                    &nbsp;&nbsp;&nbsp; {commentList.data.length} đánh giá
                    <p
                      style={{
                        borderBottom: `1px solid ${COLOR.PRIMARY}`,
                        borderTop: `1px solid ${COLOR.PRIMARY}`,
                        padding: '15px 0',
                      }}
                    >
                      Quả thật, chúng ta khó có thể phủ nhận được rằng ý nghĩa
                      bánh ngọt trong mỗi dịp kỷ niệm, sinh nhật là vô cùng quan
                      trọng và to lớn, nó mang đến niềm vui và khiến cuộc sống
                      của chúng ta trở nên ngọt ngào và đầy màu sắc hơn.
                    </p>
                  </div>
                  <S.PriceDetail>
                    {productDetail.data.productOptions?.length > 1 && (
                      <div>
                        Kích cỡ:
                        <div>
                          <Radio.Group
                            onChange={e => {
                              setSelectedOption(e.target.value);
                            }}
                            optionType="button"
                          >
                            {getProductOptions}
                          </Radio.Group>
                        </div>
                      </div>
                    )}

                    <div style={{ padding: '10px 0' }}>
                      Số lượng:
                      <InputNumber
                        min={1}
                        max={productDetail.data.balance}
                        value={productQuantity}
                        onChange={value => setProductQuantity(value)}
                      />
                    </div>

                    <div>Còn lại: {data.balance}</div>

                    <h2 style={{ color: 'red', fontWeight: 700 }}>
                      {selectedOption
                        ? `${(
                            selectedOption.price + data.price || 0
                          ).toLocaleString()} ₫`
                        : `${data.price?.toLocaleString()} ₫`}
                    </h2>
                  </S.PriceDetail>
                  <Row gutter={32} align="middle">
                    <Col
                      xs={{ span: 12, order: 1 }}
                      sm={{ span: 12, order: 1 }}
                      md={{ span: 12, order: 1 }}
                      lg={{ span: 12, order: 1 }}
                    >
                      <Button
                        icon={<ShoppingCartOutlined />}
                        type="primary"
                        onClick={() => handleAddToCart()}
                        loading={
                          actionLoading.addToCart ||
                          actionLoading.updateCartProduct
                        }
                        disabled={!data.balance}
                      >
                        Thêm vào giỏ
                      </Button>
                    </Col>
                    <Col
                      xs={{ span: 12, order: 2 }}
                      sm={{ span: 12, order: 2 }}
                      md={{ span: 12, order: 2 }}
                      lg={{ span: 12, order: 2 }}
                    >
                      <Button
                        icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                        danger
                        onClick={() => handleWishList()}
                        loading={
                          actionLoading.addToCart ||
                          actionLoading.updateCartProduct
                        }
                      >
                        {isLike ? 'Đã' : 'Yêu'} thích
                      </Button>
                    </Col>
                  </Row>
                </S.ProductDetailDescription>
              )}
            </Col>
          </S.CustomRow>
        </Card>
        <Card>
          <Row gutter={16}>
            <Col span={14}>
              <S.H2>Bạn có biết?</S.H2>
              <p>
                Tuy có nguồn gốc từ Ai Cập nhưng những chiếc bánh ngọt lại có
                tên gọi xuất phát từ “Cake”, nguồn gốc chiếc bánh ngọt Châu Âu
                có lịch sử lâu dài, từ thời Viking những chiếc bánh được làm từ
                bột mì các loại và được sử dụng các chất ngọt như đường và mật
                ong, được trộn thêm trứng và có lượng chất béo như bơ sữa, bánh
                được nở lên trong quá trình nướng thì được gọi chung là cake.
              </p>
              <br />
              <p>
                Khi những chiếc bánh ngọt truyền thống có nguồn gốc từ phương
                Tây được du nhập vào các nước Châu Á thì sự kết hợp những hương
                vị bánh được biến tấu nhiều hơn. Sự du nhập của bánh ngọt vào
                các nước Châu Á trễ hơn các nước khác và những loại bánh ngọt
                truyền thống của từng nước. Những chiếc bánh này được gia giảm
                đi các nguyên liệu có độ béo và làm cho chúng hợp hơn với khẩu
                vị người Châu Á.
              </p>
            </Col>
            <Col span={10}>
              <Card size="small" title={<S.H1>Ưu đãi</S.H1>}>
                <p>- Miễn phí vận chuyển trong vòng 3km.</p>
                <p>
                  - Miễn phí vận chuyển trên toàn thành phố Đà Nẵng khi đơn hàng
                  trên
                  <b style={{ color: 'red' }}> 300.000₫</b>.
                </p>
                <p>
                  - Với mỗi lượt mua hàng, bạn sẽ được tích điểm để tham gia
                  những ưu đãi sắp tới của chúng tôi.
                </p>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card>
          <Tabs
            type="card"
            defaultActiveKey="1"
            tabPosition="top"
            animated={{ inkBar: true, tabPane: true }}
          >
            <TabPane
              tab={
                <span style={{ fontSize: 20 }}>
                  <ProfileOutlined />
                  Thông tin chi tiết
                </span>
              }
              key="1"
            >
              <Row>
                <Descriptions
                  style={{ width: '100%' }}
                  size="middle"
                  labelStyle={{ fontSize: 16, fontWeight: 500 }}
                  bordered
                >
                  <Descriptions.Item label="Loại" span={3}>
                    {data.category?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thành phần" span={3}>
                    Trứng, đường, bơ, sữa, dâu tây, vani ...
                  </Descriptions.Item>
                  <Descriptions.Item label="Calories" span={3}>
                    400
                  </Descriptions.Item>
                  <Descriptions.Item label="Lời khuyên" span={3}>
                    Bánh ngon nhất khi bảo quản ở nhiệt dộ 18°C
                  </Descriptions.Item>
                </Descriptions>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: 20 }}>
                  <CommentOutlined />
                  Nhận xét
                </span>
              }
              key="2"
            >
              {userInfo.data.id && (
                <Form
                  form={commentForm}
                  layout="vertical"
                  initialValues={{ rating: 0, content: '' }}
                  onFinish={values => {
                    handleSubmitComment(values);
                    commentForm.resetFields();
                  }}
                >
                  <Form.Item
                    label="Đánh giá"
                    name="rating"
                    rules={[{ required: true, message: 'Required !' }]}
                  >
                    <Rate
                      allowHalf
                      style={{ fontSize: 18 }}
                      // style={{ color: COLOR.SECONDARY }}
                      // character={<HeartFilled style={{ fontSize: 18 }} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bình luận"
                    name="content"
                    rules={[
                      { required: true, message: 'Bạn cần viết bình luận!' },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Bình luận"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button htmlType="submit" type="primary">
                    Gửi
                  </Button>
                </Form>
              )}

              <List
                className="comment-list"
                header={`${commentList.data.length} Bình luận`}
                itemLayout="horizontal"
                dataSource={commentList.data}
                renderItem={item => (
                  <li>
                    <Comment
                      author={<h2>{item.user?.name}</h2>}
                      content={
                        <div>
                          <Rate
                            disabled
                            value={item.rating}
                            allowHalf
                            style={{ fontSize: 18 }}
                            // style={{ color: COLOR.SECONDARY }}
                            // character={<HeartFilled style={{ fontSize: 18 }} />}
                          />
                          <p>{item.content}</p>
                        </div>
                      }
                      datetime={moment(item.createdAt).fromNow()}
                    />
                  </li>
                )}
              />
            </TabPane>
          </Tabs>
        </Card>
      </>
    );
  }, [
    productDetail.data,
    commentList.data,
    userInfo.data,
    actionLoading,
    cartList.data,
    productQuantity,
    selectedOption,
    wishLists.data,
    id,
  ]);

  const renderRelatedProduct = useMemo(() => {
    return categoryDetail.data?.map(cake => {
      return (
        <div key={cake.id}>
          <div style={{ maxWidth: '205px', width: '100%' }}>
            <S.ProductItemWrapper>
              <S.Card>
                {cake.isNew && <S.New>Mới</S.New>}
                {categoryDetail.data.loading ? (
                  <S.SkeletonImage>
                    <Skeleton.Image />
                  </S.SkeletonImage>
                ) : (
                  <S.CardImage>
                    <Image
                      style={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        height: 'auto',
                        width: '100%',
                      }}
                      preview={false}
                      fallback={fallbackImg}
                      src={cake.image}
                      alt="img"
                      onClick={() =>
                        history.push({
                          pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                            id: cake.id,
                          }),
                          state: cake,
                        })
                      }
                    />
                  </S.CardImage>
                )}
                <S.CardContent>
                  <Row justify="center">
                    <Col>
                      <Title
                        style={{ color: COLOR.TERTIARY }}
                        level={4}
                        ellipsis={{ rows: 1 }}
                      >
                        {cake.name}
                      </Title>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col>
                      <div
                        style={{ color: 'red' }}
                      >{`${cake.price.toLocaleString()}₫`}</div>
                    </Col>
                  </Row>
                  <Row justify="space-around" align="middle">
                    <Col>
                      <Rate
                        disabled
                        // style={{ color: COLOR.SECONDARY }}
                        style={{ fontSize: 12 }}
                        allowHalf
                        value={cake.rating}
                        // character={<HeartFilled style={{ fontSize: 10 }} />}
                      ></Rate>
                    </Col>
                    <Col>
                      <S.Span>
                        {cake.balance ? `Còn: ${cake.balance}` : 'Hết'}
                      </S.Span>
                    </Col>
                  </Row>
                </S.CardContent>
              </S.Card>
            </S.ProductItemWrapper>
          </div>
        </div>
      );
    });
  }, [categoryDetail.data]);

  return (
    <>
      <TopWrapper
        breadcrumb={[...BREADCRUMB, { title: productDetail.data.name }]}
        height={180}
      />
      <S.ProductDetailContainer>
        {renderProductDetail}
        <S.RelatedWrapper>
          <S.RelatedProduct>
            <Row justify="center">
              <S.H1>{data.category?.name} tương tự</S.H1>
            </Row>

            <Slider {...sliderSettings}>{renderRelatedProduct}</Slider>
          </S.RelatedProduct>
        </S.RelatedWrapper>
      </S.ProductDetailContainer>
    </>
  );
};

export default ProductDetailPage;
