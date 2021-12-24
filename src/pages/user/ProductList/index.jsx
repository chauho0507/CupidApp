import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import TopWrapper from "../../../components/TopWrapper";
import {
  Col,
  Row,
  Card,
  Tag,
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
} from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  UnorderedListOutlined,
  ArrowsAltOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

import {
  getProductListAction,
  getCategoryListAction,
  getTopSaleListAction,
} from "../../../redux/actions";

import { ROUTER } from "../../../constants/router";
import { PAGE_SIZE } from "../../../constants/pagination";
import { COLOR } from "../../../constants/theme";
import { BREADCRUMB, DEFAULT_PRICE_FILTER } from "./constants";

import fallbackImg from "../../../assets/img/fallback.png";
import * as S from "./styles";

const ProductListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(DEFAULT_PRICE_FILTER);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const { productList, topSaleList } = useSelector(
    (state) => state.productReducer
  );
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { cartList, actionLoading } = useSelector((state) => state.cartReducer);

  const { data, meta, loading } = productList;
  const { Title } = Typography;
  const marks = {
    0: {
      style: {
        color: COLOR.SECONDARY,
      },
      label: <strong>{"0₫"}</strong>,
    },
    400000: {
      style: {
        color: COLOR.SECONDARY,
      },
      label: <strong>{"400k"}</strong>,
    },
    800000: {
      style: {
        color: COLOR.SECONDARY,
      },
      label: <strong>{"800k"}</strong>,
    },
  };

  useEffect(() => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
      })
    );
    dispatch(getCategoryListAction());
    dispatch(
      getTopSaleListAction({ limit: PAGE_SIZE.TOP_SALE_PRODUCT, page: 1 })
    );
  }, []);

  const handleSelectCategoryFilter = (e) => {
    const { value, checked } = e.target;
    const newCategoryFilter = checked
      ? [...categoryFilter, value]
      : categoryFilter.filter((filterItem) => filterItem.id !== value.id);
    setCategoryFilter(newCategoryFilter);

    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        priceFilter,
        sortFilter,
        keyword: keywordFilter,
        categoryFilter: newCategoryFilter,
      })
    );
  };

  const handleClearCategoryFilter = (categoryFilterItem) => {
    const newCategoryFilter = categoryFilter.filter(
      (filterItem) => filterItem.id !== categoryFilterItem.id
    );
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter: newCategoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncePriceFilter = useCallback(
    debounce((value) => {
      dispatch(
        getProductListAction({
          limit: PAGE_SIZE.USER_PRODUCT,
          page: 1,
          categoryFilter,
          priceFilter: value,
          keyword: keywordFilter,
          sortFilter,
        })
      );
    }, 500),
    [categoryFilter, keywordFilter, sortFilter]
  );

  const handleChangePriceFilter = (value) => {
    setPriceFilter(value);
    debouncePriceFilter(value);
  };

  const handleClearPriceFilter = () => {
    setPriceFilter(DEFAULT_PRICE_FILTER);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter: DEFAULT_PRICE_FILTER,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceKeyword = useCallback(
    debounce(
      (value) =>
        dispatch(
          getProductListAction({
            limit: PAGE_SIZE.USER_PRODUCT,
            page: 1,
            categoryFilter,
            priceFilter,
            keyword: value,
            sortFilter,
          })
        ),
      500
    ),
    [categoryFilter, priceFilter, sortFilter]
  );

  const handleSearchKeyword = (value) => {
    setKeywordFilter(value);
    debounceKeyword(value);
  };

  const handleClearKeyword = () => {
    setKeywordFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: "",
        sortFilter,
      })
    );
  };

  const handleChangeSort = (value) => {
    setSortFilter(value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter: value,
      })
    );
  };

  const handleClearSort = () => {
    setSortFilter(null);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter: "",
      })
    );
  };

  const handleLoadMore = (e) => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: productList.meta.page + 1,
        categoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
        more: true,
      })
    );
  };

  const handleClearAll = () => {
    setKeywordFilter("");
    setCategoryFilter([]);
    setPriceFilter(DEFAULT_PRICE_FILTER);
    setSortFilter("");

    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      const checked =
        categoryFilter.findIndex(
          (filterItem) => filterItem.id === categoryItem.id
        ) !== -1;
      return (
        <S.FilterItem key={categoryItem.id}>
          <Checkbox
            value={categoryItem}
            checked={checked}
            onChange={(e) => handleSelectCategoryFilter(e)}
          >
            <S.H4>{categoryItem.name}</S.H4>
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [categoryList.data, categoryFilter]);

  const renderCategoryFilterTags = useMemo(() => {
    return categoryFilter.map((categoryFilterItem, categoryFilterIndex) => (
      <Tag
        key={categoryFilterItem.id}
        closable
        onClose={() => handleClearCategoryFilter(categoryFilterItem)}
      >
        {categoryFilterItem.name}
      </Tag>
    ));
  }, [categoryFilter]);

  const renderTopSaleList = useMemo(() => {
    return topSaleList.data.map((cake) => (
      <Card
        key={cake.id}
        bordered
        style={{
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: 12,
          cursor: "pointer",
        }}
        size="small"
        onClick={() =>
          history.push({
            pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
              id: cake.id,
            }),
            state: cake,
          })
        }
      >
        <S.TopSaleCard>
          <S.TopSaleImage
            preview={false}
            fallback={fallbackImg}
            src={cake.image}
            alt="img"
          />
          <S.TopSaleCardDetail>
            <Title
              level={5}
              ellipsis={{ rows: 1 }}
              style={{ color: COLOR.TERTIARY }}
            >
              {cake.name}
            </Title>
            <S.Span
              style={{ color: "red" }}
            >{`${cake.price.toLocaleString()} ₫`}</S.Span>
            <Rate
              disabled
              style={{ fontSize: 14 }}
              allowHalf
              value={cake.rating}
            />
          </S.TopSaleCardDetail>
        </S.TopSaleCard>
      </Card>
    ));
  }, [topSaleList.data]);

  const renderProductList = useMemo(() => {
    return productList.data?.map((cake) => (
      <Col xs={12} lg={8} xl={6} key={cake.id}>
        <S.ProductItemWrapper>
          <S.Card
            size="small"
            onClick={() =>
              history.push({
                pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                  id: cake.id,
                }),
                state: cake,
              })
            }
          >
            <S.CardImage>
              {cake.isNew && <S.New>Mới</S.New>}
              {loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
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
                />
              )}
            </S.CardImage>
            <S.CardContent>
              <Row justify="center">
                <Col>
                  <Title
                    level={4}
                    ellipsis={{ rows: 1 }}
                    style={{ color: COLOR.TERTIARY }}
                  >
                    {cake.name}
                  </Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <div
                    style={{ color: "red", fontWeight: 500, fontSize: 16 }}
                  >{`${cake.price?.toLocaleString()}₫`}</div>
                </Col>
              </Row>
              <Row justify="space-around" align="middle">
                <Col>
                  <Rate disabled allowHalf value={cake.rating}></Rate>
                </Col>

                <Col>
                  <S.Span>
                    {cake.balance ? `Còn: ${cake.balance}` : "Hết"}
                  </S.Span>
                </Col>
              </Row>
            </S.CardContent>
          </S.Card>
        </S.ProductItemWrapper>
      </Col>
    ));
  }, [productList.data, actionLoading, userInfo.data, cartList.data]);

  return (
    <Spin spinning={productList.loading && categoryList.loading}>
      <TopWrapper
        titlePage="Danh sách sản phẩm"
        breadcrumb={BREADCRUMB}
        height={180}
      />
      <S.Container>
        <Row gutter={[0, 16]}>
          <Col md={6} xs={24}>
            <Input
              placeholder="Tìm kiếm..."
              value={keywordFilter}
              onChange={(e) => {
                handleSearchKeyword(e.target.value);
              }}
              suffix={
                <SearchOutlined
                  style={{ fontSize: 20, color: COLOR.PRIMARY_DARK }}
                />
              }
            />
          </Col>
          <Col md={{ span: 17, offset: 1 }} xs={{ span: 24 }}>
            <Row gutter={16}>
              <Col md={18} xs={12}>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: 4,
                    padding: "3px 10px",
                    height: "32px",
                    border: "1px solid #d9d9d9",
                    width: "100%",
                  }}
                >
                  <S.NumberProduct>{data.length}</S.NumberProduct> /
                  <S.NumberProduct>{meta?.total}</S.NumberProduct> sản phẩm ...
                </div>
              </Col>
              <Col md={6} xs={12}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Sắp xếp theo..."
                  allowClear
                  onChange={(value) => handleChangeSort(value)}
                  onClear={() => handleClearSort()}
                >
                  <Select.Option value="asc">
                    <ArrowUpOutlined
                      style={{ marginRight: 4, color: COLOR.PRIMARY_DARK }}
                    />
                    Giá tăng dần
                  </Select.Option>
                  <Select.Option value="desc">
                    <ArrowDownOutlined
                      style={{ marginRight: 4, color: COLOR.PRIMARY_DARK }}
                    />
                    Giá giảm dần
                  </Select.Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ height: 35 }} align="middle">
          <Col offset={7} span={17}>
            <Space wrap={false} style={{ marginTop: 6 }}>
              {!!categoryFilter.length && renderCategoryFilterTags}
              {keywordFilter && (
                <Tag closable onClose={() => handleClearKeyword()}>
                  Từ khóa: {keywordFilter}
                </Tag>
              )}
              {(priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && (
                <Tag closable onClose={() => handleClearPriceFilter()}>
                  {`Giá từ: ${priceFilter[0].toLocaleString()} - ${priceFilter[1].toLocaleString()}`}
                </Tag>
              )}
              {(keywordFilter ||
                !!categoryFilter.length ||
                priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && (
                <Tag
                  style={{
                    backgroundColor: COLOR.PRIMARY_DARK,
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClearAll()}
                >
                  <span style={{ color: COLOR.SECONDARY }}>Xóa tất cả</span>
                </Tag>
              )}
            </Space>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <Row align="top">
              <Col
                // xs={{ span: 12 }}
                // sm={{ span: 12 }}
                // md={{ span: 24 }}
                // lg={{ span: 24 }}
                // xl={{ span: 24 }}
                span={24}
              >
                <Card
                  size="small"
                  title={
                    <>
                      <UnorderedListOutlined
                        style={{ marginRight: 20, color: "#fff" }}
                      />
                      Sản phẩm
                    </>
                  }
                  headStyle={{
                    fontSize: 18,
                    color: "white",
                    backgroundColor: COLOR.PRIMARY_DARK,
                  }}
                  style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)" }}
                >
                  {renderCategoryList}
                </Card>
              </Col>

              <Col
                // xs={{ span: 12 }}
                // sm={{ span: 12 }}
                // md={{ span: 24 }}
                // lg={{ span: 24 }}
                // xl={{ span: 24 }}
                span={24}
              >
                <Card
                  size="small"
                  style={{
                    marginTop: 16,
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
                  }}
                  title={
                    <>
                      <ArrowsAltOutlined
                        style={{ marginRight: 20, color: "#fff" }}
                      />
                      Khoảng giá
                    </>
                  }
                  headStyle={{
                    fontSize: 18,
                    color: "white",
                    backgroundColor: COLOR.PRIMARY_DARK,
                  }}
                >
                  <Slider
                    range
                    marks={marks}
                    defaultValue={DEFAULT_PRICE_FILTER}
                    min={DEFAULT_PRICE_FILTER[0]}
                    max={DEFAULT_PRICE_FILTER[1]}
                    step={50000}
                    value={priceFilter}
                    tipFormatter={(value) => value.toLocaleString()}
                    onChange={(value) => {
                      handleChangePriceFilter(value);
                    }}
                  />
                </Card>
              </Col>

              <Col
                // xs={{ span: 12 }}
                // sm={{ span: 12 }}
                // md={{ span: 24 }}
                // lg={{ span: 24 }}
                // xl={{ span: 24 }}
                span={24}
              >
                <Card
                  size="small"
                  style={{
                    margin: "16px 0",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
                  }}
                  title={
                    <>
                      <HeartOutlined
                        style={{ marginRight: 20, color: COLOR.WHITE }}
                      />
                      Bán nhiều nhất
                    </>
                  }
                  headStyle={{
                    fontSize: 18,
                    color: COLOR.WHITE,
                    backgroundColor: COLOR.PRIMARY_DARK,
                  }}
                >
                  <div style={{ width: "100%" }}>{renderTopSaleList}</div>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ offset: 1, span: 17 }}
            lg={{ offset: 1, span: 17 }}
            xl={{ offset: 1, span: 17 }}
          >
            <S.ProductContainer>
              <Row gutter={[16, 16]}>{renderProductList}</Row>
            </S.ProductContainer>
            {productList.meta?.total !== productList.data.length && (
              <Row justify="center" style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  loading={productList.loading}
                  onClick={handleLoadMore}
                >
                  Xem thêm
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </S.Container>
    </Spin>
  );
};

export default ProductListPage;
