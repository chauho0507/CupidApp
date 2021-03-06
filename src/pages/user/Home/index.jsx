import React, { useEffect, useMemo } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  Col,
  Row,
  Skeleton,
  Image,
  Button,
  Card,
  Rate,
  Form,
  Input,
  Typography,
  Carousel,
  Avatar,
  Spin,
} from "antd";

import { HeartFilled, UserOutlined } from "@ant-design/icons";

import {
  getProductListAction,
  getCommentListAction,
  getBlogListAction,
} from "../../../redux/actions";

import { COLOR } from "../../../constants/theme";
import { ROUTER } from "../../../constants/router";
import { PAGE_SIZE } from "../../../constants/pagination";

import slide_1 from "../../../assets/img/HomeSlider/slider-1.jpg";
import slide_2 from "../../../assets/img/HomeSlider/slider-2.jpg";
import slide_3 from "../../../assets/img/HomeSlider/slider-3.jpg";
import fallbackImg from "../../../assets/img/fallback.png";
import IntroImage from "../../../assets/img/IntroSection.jpg";
import recipeContent from "../../../assets/img/recipeContent.png";
import chef_1 from "../../../assets/img/chef/chef-1.jpg";
import chef_2 from "../../../assets/img/chef/chef-2.jpg";
import chef_3 from "../../../assets/img/chef/chef-3.jpg";

import * as S from "./styles";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Title } = Typography;

  const { userInfo } = useSelector((state) => state.authReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const { blogList } = useSelector((state) => state.blogReducer);

  const productSlider = {
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
        breakpoint: 1260,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1060,
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

  const reviewSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  const images = [
    {
      id: 1,
      src: slide_1,
      alt: "img",
    },
    {
      id: 2,
      src: slide_2,
      alt: "img",
    },
    {
      id: 3,
      src: slide_3,
      alt: "img",
    },
  ];

  useEffect(() => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.HOME_PRODUCT,
        page: 1,
      })
    );
    dispatch(getCommentListAction({ productId: null }));
    dispatch(getBlogListAction({ limit: PAGE_SIZE.HOME_BLOG, page: 1 }));
  }, [userInfo.data]);

  const cakeList = productList.data.filter((cake) => cake.categoryId !== 6);
  const drinkList = productList.data.filter((cake) => cake.categoryId === 6);

  const renderCakeList = useMemo(() => {
    return cakeList.map((cake) => {
      return (
        <div key={cake.id}>
          <div style={{ maxWidth: "205px", width: "100%" }}>
            <S.ProductItemWrapper>
              <S.Card>
                <S.CardImage>
                  {cake.isNew && <S.New>M???i</S.New>}
                  {productList.loading ? (
                    <S.SkeletonImage>
                      <Skeleton.Image />
                    </S.SkeletonImage>
                  ) : (
                    <Image
                      style={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
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
                  )}
                </S.CardImage>
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
                        style={{ color: "red", fontWeight: 500 }}
                      >{`${cake.price?.toLocaleString()}???`}</div>
                    </Col>
                  </Row>
                  <Row justify="space-around" align="middle">
                    <Col>
                      <Rate
                        disabled
                        style={{ fontSize: 14 }}
                        allowHalf
                        value={cake.rating}
                        // character={<HeartFilled style={{ fontSize: 10 }} />}
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
  }, [cakeList]);

  const renderDrinkList = useMemo(() => {
    return drinkList.map((drink) => {
      return (
        <div key={drink.id}>
          <div style={{ maxWidth: "205px", width: "100%" }}>
            <S.ProductItemWrapper>
              <S.Card>
                <S.CardImage>
                  {drink.isNew && <S.New>M???i</S.New>}
                  {productList.loading ? (
                    <S.SkeletonImage>
                      <Skeleton.Image />
                    </S.SkeletonImage>
                  ) : (
                    <Image
                      style={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                      }}
                      preview={false}
                      fallback={fallbackImg}
                      src={drink.image}
                      alt="img"
                      onClick={() =>
                        history.push({
                          pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                            id: drink.id,
                          }),
                          state: drink,
                        })
                      }
                    />
                  )}
                </S.CardImage>
                <S.CardContent>
                  <Row justify="center">
                    <Col>
                      <Title
                        style={{ color: COLOR.TERTIARY }}
                        level={4}
                        ellipsis={{ rows: 1 }}
                      >
                        {drink.name}
                      </Title>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col>
                      <div
                        style={{ color: "red", fontWeight: 500 }}
                      >{`${drink.price.toLocaleString()}???`}</div>
                    </Col>
                  </Row>
                  <Row justify="space-around" align="middle">
                    <Col>
                      <Rate
                        disabled
                        style={{ fontSize: 14 }}
                        allowHalf
                        value={drink.rating}
                        // character={<HeartFilled style={{ fontSize: 10 }} />}
                      ></Rate>
                    </Col>
                    <Col>
                      <S.Span>
                        {drink.balance ? `C??n: ${drink.balance}` : "H???t"}
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
  }, [drinkList]);

  const renderReviewList = useMemo(() => {
    return commentList.data.map((comment, commentIndex) => (
      <S.ReviewItem key={commentIndex}>
        <Row align="middle">
          <Col sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
            <Avatar
              size={{ sm: 70, md: 80, lg: 110, xl: 130 }}
              icon={<UserOutlined />}
              style={{ margin: "0 10px" }}
              src={comment.user.avatar}
            />
          </Col>
          <Col
            sm={{ offset: 2, span: 15 }}
            md={{ offset: 1, span: 15 }}
            lg={{ offset: 1, span: 15 }}
          >
            <Row>{comment.content}</Row>
            <Row justify="end">- {comment.user.fullName}</Row>
          </Col>
        </Row>
      </S.ReviewItem>
    ));
  }, [commentList.data]);

  const renderBlogList = useMemo(() => {
    return blogList.data.map((blog) => (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        key={blog.id}
      >
        <S.BlogItemWrapper>
          <S.CardBlog
            onClick={() =>
              history.push(
                generatePath(ROUTER.USER.BLOG_DETAIL, { id: blog.id })
              )
            }
          >
            <S.CardImages>
              {blogList.loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
                <Image
                  fallback={fallbackImg}
                  preview={false}
                  src={blog.image}
                  style={{ borderRadius: 4 }}
                ></Image>
              )}
            </S.CardImages>
            <S.CardDetails>
              <Title
                level={2}
                ellipsis={{ rows: 2 }}
                style={{ color: COLOR.TERTIARY }}
              >
                {blog.title}
              </Title>
              <Title level={5} ellipsis={{ rows: 2 }}>
                {blog.description}
              </Title>

              <Row justify="end">
                <Button type="primary">Xem th??m</Button>
              </Row>
            </S.CardDetails>
          </S.CardBlog>
        </S.BlogItemWrapper>
      </Col>
    ));
  }, [blogList.data]);

  return (
    <Spin spinning={productList.loading}>
      <Carousel
        autoplay={true}
        autoplaySpeed={2500}
        effect="fade"
        dots={false}
        pauseOnHover={false}
      >
        {images.map((item) => (
          <div key={item.id}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={item.src}
              alt={item.alt}
            />
          </div>
        ))}
      </Carousel>
      <S.MainContainer>
        <S.IntroSection>
          <Row justify="center">
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 12, order: 1 }}
            >
              <S.H1>
                Ch??o m???ng b???n ?????n <S.ShopName>Cupid Bakery!</S.ShopName>
              </S.H1>
              <p>
                B???t ?????u m??? c???a t??? n??m 2021, Cupid Bakery mong mu???n mang cho b???n
                tr???i nghi???m t???t nh???t v??? b??nh ng???t, c??ng nh?? nh???ng ?? t?????ng qu??
                t???ng trong nh???ng d???p l??? t???t. S??? h??i l??ng c???a c??c b???n l?? gi?? tr???
                l???n nh???t ?????i v???i ch??ng t??i.
              </p>
              <p>
                H??y ?????n v???i Cupid Bakery ????? tr???i nghi???m nh???ng lo???i b??nh th??m
                ngon, ?????p m???t nh???t, c??ng nh?? nh???ng m??n qu?? sang tr???ng v?? ?? ngh??a
                nh???t.
              </p>
              <p>
                M???i ?? ki???n ????ng g??p c???a c??c b???n ?????u qu?? b??u ????? Cupid Bakery c??
                th??? ph??t tri???n h??n n???a trong th???i gian s???p t???i.
              </p>
              <Button
                size="large"
                shape="round"
                type="primary"
                onClick={() => history.push(ROUTER.USER.INTRODUCTION)}
                style={{ marginTop: 30 }}
              >
                T??m hi???u th??m v??? ch??ng t??i
              </Button>
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ offset: 1, span: 11, order: 2 }}
            >
              <Image
                src={IntroImage}
                alt="img"
                preview={false}
                style={{ height: "auto", width: "100%", borderRadius: 4 }}
              />
            </Col>
          </Row>
        </S.IntroSection>
        <S.CakeSection>
          <Row justify="space-between" align="middle">
            <S.H1>C??c lo???i b??nh</S.H1>
            <Button
              type="primary"
              onClick={() => history.push(ROUTER.USER.PRODUCT_LIST)}
            >
              Xem th??m
            </Button>
          </Row>
          <Slider {...productSlider}>{renderCakeList}</Slider>
        </S.CakeSection>
      </S.MainContainer>
      <S.RecipeSection>
        <S.RecipeContent>
          <Row>
            <Col md={{ offset: 2, span: 4 }} lg={{ offset: 2, span: 6 }}>
              <img src={recipeContent} alt="recipe img"></img>
            </Col>
            <Col md={{ offset: 2, span: 12 }} lg={{ offset: 2, span: 12 }}>
              <Row style={{ alignItems: "center" }}>
                <S.RecipeTitle>C??ng th???c ?????c bi???t</S.RecipeTitle>
                <p>
                  Cupcake l?? m??n b??nh tr??ng mi???ng ???????c ??a chu???ng ??? ch??u ??u.
                  Chi???c b??nh n??y c?? k??ch th?????c nh??? g???n. ?????c bi???t ch??ng ???????c ?????
                  v??o khu??n ????? n?????ng l??n v?? trang tr?? th??m kem t????i b??n tr??n.
                  Ph???n kem t????i n??y ch??nh l?? ??i???m nh???n quan tr???ng l??m cho chi???c
                  b??nh Cupcake th??m h???p d???n. Khi th?????ng th???c Cupcake kem t????i
                  b???n s??? c???m nh???n ???????c b??nh c?? ????? m???m, m???n v?? kh?? ng???t. ?????c
                  bi???t, chi???c b??nh n??y ???????c xem l?? phi??n b???n thu nh??? c???a m??n
                  b??nh b??ng lan.
                </p>
              </Row>
            </Col>
          </Row>
        </S.RecipeContent>
      </S.RecipeSection>
      <S.MainContainer>
        <S.DrinkSection>
          <Row justify="space-between" align="middle">
            <S.H1>N?????c u???ng</S.H1>
            <Button
              type="primary"
              onClick={() => history.push(ROUTER.USER.PRODUCT_LIST)}
            >
              Xem th??m
            </Button>
          </Row>

          <Slider {...productSlider}>{renderDrinkList}</Slider>
        </S.DrinkSection>
      </S.MainContainer>
      <S.ChefSection>
        <Row justify="center">
          <S.H1>B???p tr?????ng</S.H1>
        </Row>
        <Row gutter={32}>
          <Col span={8}>
            <img src={chef_1} alt="chef-img" />
            <S.H2>Alice Williams</S.H2>
          </Col>
          <Col span={8}>
            <img src={chef_2} alt="chef-img" />
            <S.H2>Peter Thomas</S.H2>
          </Col>
          <Col span={8}>
            <img src={chef_3} alt="chef-img" />
            <S.H2>John Smith</S.H2>
          </Col>
        </Row>
      </S.ChefSection>
      <S.ReviewSection>
        <S.ReviewContent>
          <Row justify="center">
            <S.ReviewTitle>Kh??ch h??ng nh???n x??t</S.ReviewTitle>
          </Row>
          <Slider {...reviewSlider}>{renderReviewList}</Slider>
        </S.ReviewContent>
      </S.ReviewSection>
      <S.BlogsContainer>
        <S.H1>B??i vi???t m???i nh???t</S.H1>
        <Row gutter={[16, 16]}>{renderBlogList}</Row>
      </S.BlogsContainer>
      <S.ContactSection>
        <Row align="middle">
          <Col span={10}>
            <S.ContactTitle>
              H??y ????ng k?? ????? nh???n ???????c nh???ng th??ng tin m???i nh???t v??? s???n ph???m v??
              khuy???n m??i c???a ch??ng t??i.
            </S.ContactTitle>
          </Col>
          <Col offset={2} span={12}>
            <Form layout="horizontal">
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Input.Group>
                      <Input
                        style={{ width: "calc(100% - 100px)", height: 45 }}
                        placeholder="Nh???p email c???a b???n..."
                      />
                      <Button
                        style={{
                          width: "100px",
                          height: 45,
                          backgroundColor: COLOR.PRIMARY_LIGHT,
                        }}
                      >
                        X??c nh???n
                      </Button>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </S.ContactSection>
    </Spin>
  );
};

export default HomePage;
