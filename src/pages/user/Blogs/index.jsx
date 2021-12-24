import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';

import TopWrapper from '../../../components/TopWrapper';
import { Card, Col, Row, Image, Typography, Button, Skeleton } from 'antd';

import { getBlogListAction } from '../../../redux/actions';

import { BREADCRUMB } from './constants';
import { COLOR } from '../../../constants/theme';
import { ROUTER } from '../../../constants/router';
import { PAGE_SIZE } from '../../../constants/pagination';
import fallbackImg from '../../../assets/img/fallback.png';

import * as S from './styles';

const BlogsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { blogList } = useSelector(state => state.blogReducer);

  const { Title } = Typography;

  useEffect(() => {
    dispatch(getBlogListAction({ limit: PAGE_SIZE.BLOGS, page: 1 }));
  }, []);

  const handleLoadMore = () => {
    dispatch(
      getBlogListAction({
        limit: PAGE_SIZE.BLOGS,
        page: blogList.meta.page + 1,
        more: true,
      })
    );
  };

  const renderBlogs = useMemo(() => {
    return blogList.data.map(blog => (
      <Col xs={24} sm={12} md={12} lg={8} key={blog.id}>
        <S.BlogItemWrapper>
          <S.Card
            onClick={() =>
              history.push(
                generatePath(ROUTER.USER.BLOG_DETAIL, { id: blog.id })
              )
            }
          >
            <S.CardImage>
              {blogList.loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
                <Image
                  preview={false}
                  src={blog.image}
                  alt="blog-image"
                  fallback={fallbackImg}
                  // style={{ height: '100%', width: 'auto' }}
                ></Image>
              )}
            </S.CardImage>
            <S.CardDetail>
              <Title
                level={3}
                ellipsis={{ rows: 2 }}
                style={{ color: COLOR.TERTIARY }}
              >
                {blog.title}
              </Title>
              <Title level={5} ellipsis={{ rows: 2 }}>
                {blog.description}
              </Title>
              <Row justify="end">
                <Button type="primary">Xem thêm</Button>
              </Row>
            </S.CardDetail>
          </S.Card>
        </S.BlogItemWrapper>
      </Col>
    ));
  }, [blogList.data]);

  return (
    <>
      <TopWrapper titlePage="Bài viết" breadcrumb={BREADCRUMB} height={180} />
      <S.BlogsContainer>
        <Row gutter={[32, 32]}>
          {renderBlogs}
          {blogList.meta.total !== blogList.data.length && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button
                type="primary"
                ghost
                loading={blogList.loading}
                onClick={handleLoadMore}
              >
                Xem thêm
              </Button>
            </Row>
          )}
        </Row>
      </S.BlogsContainer>
    </>
  );
};

export default BlogsPage;
