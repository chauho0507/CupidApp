import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from 'antd';

import TopWrapper from '../../../components/TopWrapper';

import { getBlogDetailAction } from '../../../redux/actions';

import { BREADCRUMB } from './constants';

import * as S from './styles';

const BlogDetailPage = () => {
  const { params } = useRouteMatch();
  const { id } = params;
  const dispatch = useDispatch();
  const { blogDetail } = useSelector(state => state.blogReducer);

  useEffect(() => {
    if (id) dispatch(getBlogDetailAction({ id }));
  }, []);

  return (
    <>
      <TopWrapper titlePage="Chi tiết" breadcrumb={BREADCRUMB} />
      <S.BlogDetailContainer>
        <Card>
          <S.H1>{blogDetail.data.title}</S.H1>
          <S.BlogContent
            dangerouslySetInnerHTML={{ __html: blogDetail.data.content }}
          />
        </Card>
      </S.BlogDetailContainer>
    </>
  );
};

export default BlogDetailPage;
