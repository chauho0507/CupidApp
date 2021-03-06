import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch, generatePath } from "react-router-dom";
import TopWrapper from "../../../components/TopWrapper";
import Slider from "react-slick";
import moment from "moment";

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
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ProfileOutlined,
  CommentOutlined,
  HeartFilled,
} from "@ant-design/icons";

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
} from "../../../redux/actions";
import { BREADCRUMB } from "./constants";
import { ROUTER } from "../../../constants/router";
import { COLOR } from "../../../constants/theme";

import fallbackImg from "../../../assets/img/fallback.png";

import * as S from "./styles";
import Avatar from "antd/lib/avatar/avatar";

const ProductDetailPage = ({ match, ...props }) => {
  const { params } = useRouteMatch();
  const { id } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  const [commentForm] = Form.useForm();
  const { categoryId } = props.location.state;
  const { userInfo } = useSelector((state) => state.authReducer);
  const { wishLists } = useSelector((state) => state.wishListsReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { categoryDetail } = useSelector((state) => state.categoryReducer);
  const { cartList, actionLoading } = useSelector((state) => state.cartReducer);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const isLike =
    wishLists.data.findIndex((item) => item.productId === parseInt(id)) !== -1;

  const { data } = productDetail;
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
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
      dispatch(getWishListAction({ userId: parseInt(userInfo.data.id) }));
    }
    if (categoryId) {
      dispatch(
        getCategoryDetailAction({
          id: parseInt(categoryId),
        })
      );
    }
  }, [id]);

  const getProductOptions = useMemo(() => {
    if (productDetail.data.productOptions?.length > 1) {
      return productDetail.data.productOptions.map((option) => {
        return (
          <Radio.Button key={option.id} value={option}>
            {option.name}
          </Radio.Button>
        );
      });
    }
  }, [productDetail.data]);

  const handleSubmitComment = (values) => {
    const isExist =
      commentList.data.findIndex((item) => item.userId === userInfo.data.id) !==
      -1;
    if (isExist) {
      notification.warning({
        message: "B???n ???? b??nh lu???n",
        placement: "bottomRight",
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
            message: "H??y ch???n m???t k??ch c???!",
            placement: "bottomRight",
          });
        } else {
          const existCartProduct = cartList.data.find(
            (item) => item.productOptionId === selectedOption.id
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
                      message: "C???p nh???t s??? l?????ng th??nh c??ng!",
                      placement: "bottomRight",
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
          (item) => item.productId === parseInt(id)
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
                    message: "C???p nh???t s??? l?????ng th??nh c??ng!",
                    placement: "bottomRight",
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
        message: "Th??ng b??o",
        description: "B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y!",
        placement: "bottomRight",
      });
    }
  };

  const handleWishList = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const wish = wishLists.data.find(
          (item) => item.productId === parseInt(id)
        );
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
    } else
      notification.error({
        message: "B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y!",
        placement: "bottomRight",
      });
  };

  const renderProductDetail = useMemo(() => {
    return (
      <>
        <Card>
          <S.CustomRow gutter={[30, 30]} justify="center">
            <Col
              sm={{ span: 24, order: 1 }}
              md={{ span: 14, order: 1 }}
              lg={{ span: 12, order: 1 }}
            >
              {productDetail.loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
                <Image
                  fallback={fallbackImg}
                  style={{
                    borderRadius: "4px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  src={data.image}
                  alt="img"
                />
              )}
            </Col>
            <Col
              sm={{ span: 20, order: 2 }}
              md={{ span: 10, order: 2 }}
              lg={{ span: 12, order: 1 }}
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
                      value={data.rating}
                    ></Rate>
                    &nbsp;&nbsp;&nbsp; {commentList.data.length} Nh???n x??t
                    <p
                      style={{
                        borderBottom: `1px solid ${COLOR.PRIMARY}`,
                        borderTop: `1px solid ${COLOR.PRIMARY}`,
                        padding: "15px 0",
                      }}
                    >
                      Qu??? th???t, ch??ng ta kh?? c?? th??? ph??? nh???n ???????c r???ng ?? ngh??a
                      b??nh ng???t trong m???i d???p k??? ni???m, sinh nh???t l?? v?? c??ng quan
                      tr???ng v?? to l???n, n?? mang ?????n ni???m vui v?? khi???n cu???c s???ng
                      c???a ch??ng ta tr??? n??n ng???t ng??o v?? ?????y m??u s???c h??n.
                    </p>
                  </div>
                  <S.PriceDetail>
                    {productDetail.data.productOptions?.length > 1 && (
                      <div>
                        <S.H3>K??ch c???:</S.H3>
                        <div>
                          <Radio.Group
                            onChange={(e) => {
                              setSelectedOption(e.target.value);
                            }}
                            optionType="button"
                          >
                            {getProductOptions}
                          </Radio.Group>
                        </div>
                      </div>
                    )}

                    <div style={{ padding: "10px 0" }}>
                      <S.H3>S??? l?????ng:</S.H3>
                      <InputNumber
                        min={1}
                        max={productDetail.data.balance}
                        value={productQuantity}
                        onChange={(value) => setProductQuantity(value)}
                      />
                    </div>
                    {!!data.balance ? (
                      <S.H3>C??n l???i: {data.balance}</S.H3>
                    ) : (
                      <S.H2>H???t</S.H2>
                    )}

                    <h1 style={{ color: "red", fontWeight: 700 }}>
                      {selectedOption
                        ? `${(
                            selectedOption?.price + data.price || 0
                          ).toLocaleString()} ???`
                        : `${data.price?.toLocaleString()} ???`}
                    </h1>
                  </S.PriceDetail>
                  <Row gutter={[16, 16]} align="middle">
                    <Col
                      xs={{ span: 24, order: 1 }}
                      sm={{ span: 24, order: 1 }}
                      md={{ span: 14, order: 1 }}
                      lg={{ span: 14, order: 1 }}
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
                        size="large"
                        style={{ width: "100%" }}
                      >
                        Th??m v??o gi???
                      </Button>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 2 }}
                      sm={{ span: 24, order: 2 }}
                      md={{ span: 10, order: 2 }}
                      lg={{ span: 10, order: 2 }}
                    >
                      <Button
                        icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                        danger
                        onClick={() => handleWishList()}
                        loading={
                          actionLoading.addToCart ||
                          actionLoading.updateCartProduct
                        }
                        size="large"
                        style={{ width: "100%" }}
                      >
                        {isLike ? "????" : "Y??u"} th??ch
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
              <S.H2>B???n c?? bi???t?</S.H2>
              <p>
                Tuy c?? ngu???n g???c t??? Ai C???p nh??ng nh???ng chi???c b??nh ng???t l???i c??
                t??n g???i xu???t ph??t t??? ???Cake???, ngu???n g???c chi???c b??nh ng???t Ch??u ??u
                c?? l???ch s??? l??u d??i, t??? th???i Viking nh???ng chi???c b??nh ???????c l??m t???
                b???t m?? c??c lo???i v?? ???????c s??? d???ng c??c ch???t ng???t nh?? ???????ng v?? m???t
                ong, ???????c tr???n th??m tr???ng v?? c?? l?????ng ch???t b??o nh?? b?? s???a, b??nh
                ???????c n??? l??n trong qu?? tr??nh n?????ng th?? ???????c g???i chung l?? cake.
              </p>
              <br />
              <p>
                Khi nh???ng chi???c b??nh ng???t truy???n th???ng c?? ngu???n g???c t??? ph????ng
                T??y ???????c du nh???p v??o c??c n?????c Ch??u ?? th?? s??? k???t h???p nh???ng h????ng
                v??? b??nh ???????c bi???n t???u nhi???u h??n. S??? du nh???p c???a b??nh ng???t v??o
                c??c n?????c Ch??u ?? tr??? h??n c??c n?????c kh??c v?? nh???ng lo???i b??nh ng???t
                truy???n th???ng c???a t???ng n?????c. Nh???ng chi???c b??nh n??y ???????c gia gi???m
                ??i c??c nguy??n li???u c?? ????? b??o v?? l??m cho ch??ng h???p h??n v???i kh???u
                v??? ng?????i Ch??u ??.
              </p>
            </Col>
            <Col span={10}>
              <Card size="small" title={<S.H1>??u ????i</S.H1>}>
                <p>- Mi???n ph?? v???n chuy???n trong v??ng 3km.</p>
                <p>
                  - Mi???n ph?? v???n chuy???n tr??n to??n th??nh ph??? ???? N???ng khi ????n h??ng
                  tr??n
                  <b style={{ color: "red" }}> 300.000???</b>.
                </p>
                <p>
                  - V???i m???i l?????t mua h??ng, b???n s??? ???????c t??ch ??i???m ????? tham gia
                  nh???ng ??u ????i s???p t???i c???a ch??ng t??i.
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
                  Th??ng tin chi ti???t
                </span>
              }
              key="1"
            >
              <Row>
                <Descriptions
                  style={{ width: "100%" }}
                  size="middle"
                  labelStyle={{ fontSize: 16, fontWeight: 500 }}
                  bordered
                >
                  <Descriptions.Item label="Lo???i" span={3}>
                    {data.category?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Th??nh ph???n" span={3}>
                    Tr???ng, ???????ng, b??, s???a, d??u t??y, vani ...
                  </Descriptions.Item>
                  <Descriptions.Item label="Calories" span={3}>
                    400
                  </Descriptions.Item>
                  <Descriptions.Item label="L???i khuy??n" span={3}>
                    B??nh ngon nh???t khi b???o qu???n ??? nhi???t d??? 18??C
                  </Descriptions.Item>
                </Descriptions>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: 20 }}>
                  <CommentOutlined />
                  Nh???n x??t
                </span>
              }
              key="2"
            >
              {userInfo.data.id && (
                <Form
                  form={commentForm}
                  layout="vertical"
                  initialValues={{ rating: 0, content: "" }}
                  onFinish={(values) => {
                    handleSubmitComment(values);
                    commentForm.resetFields();
                  }}
                >
                  <Form.Item
                    label="????nh gi??"
                    name="rating"
                    rules={[{ required: true, message: "Required !" }]}
                  >
                    <Rate allowHalf style={{ fontSize: 18 }} />
                  </Form.Item>
                  <Form.Item
                    label="B??nh lu???n"
                    name="content"
                    rules={[
                      { required: true, message: "B???n c???n vi???t b??nh lu???n!" },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="B??nh lu???n"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button htmlType="submit" type="primary">
                    G???i
                  </Button>
                </Form>
              )}

              <List
                className="comment-list"
                header={`${commentList.data.length} B??nh lu???n`}
                itemLayout="horizontal"
                dataSource={commentList.data}
                renderItem={(item) => (
                  <li>
                    <Comment
                      author={<h2>{item.user?.fullName}</h2>}
                      content={
                        <S.CommentContainer>
                          <S.CommentAvatar>
                            <Avatar
                              size={{
                                xs: 60,
                                sm: 70,
                                md: 80,
                                lg: 90,
                                xl: 90,
                              }}
                              src={item.user.avatar}
                            />
                          </S.CommentAvatar>
                          <S.CommentDetail>
                            <Rate
                              disabled
                              value={item.rating}
                              allowHalf
                              style={{ fontSize: 18 }}
                            />
                            <p>{item.content}</p>
                          </S.CommentDetail>
                        </S.CommentContainer>
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
    return categoryDetail.data?.map((cake) => {
      return (
        <div key={cake.id}>
          <div style={{ maxWidth: "205px", width: "100%" }}>
            <S.ProductItemWrapper>
              <S.Card>
                {cake.isNew && <S.New>M???i</S.New>}
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
                        height: "auto",
                        width: "100%",
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
                        style={{ color: "red" }}
                      >{`${cake.price.toLocaleString()}???`}</div>
                    </Col>
                  </Row>
                  <Row justify="space-around" align="middle">
                    <Col>
                      <Rate
                        disabled
                        style={{ fontSize: 12 }}
                        allowHalf
                        value={cake.rating}
                      ></Rate>
                    </Col>
                    <Col>
                      <S.Span>
                        {cake.balance ? `C??n: ${cake.balance}` : "H???t"}
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
              <S.H1>{data.category?.name} t????ng t???</S.H1>
            </Row>

            <Slider {...sliderSettings}>{renderRelatedProduct}</Slider>
          </S.RelatedProduct>
        </S.RelatedWrapper>
      </S.ProductDetailContainer>
    </>
  );
};

export default ProductDetailPage;
