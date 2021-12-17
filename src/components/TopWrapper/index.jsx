import React from 'react';
import { useHistory } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import * as S from './styles';

const TopWrapper = ({ titlePage, breadcrumb = [], height }) => {
  const history = useHistory();

  const redirectPage = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const renderBreadcrumb = () => {
    return breadcrumb.map((breadcrumbItem, breadcrumbIndex) => {
      return (
        <Breadcrumb.Item
          key={`breadcrumb-${breadcrumbIndex}`}
          {...(breadcrumbIndex !== breadcrumb.length - 1 && {
            href: '#',
          })}
          onClick={e => redirectPage(e, breadcrumbItem.path)}
        >
          {breadcrumbItem.icon && breadcrumbItem.icon}
          <span>{breadcrumbItem.title}</span>
        </Breadcrumb.Item>
      );
    });
  };

  return (
    <S.TopContainer height={height}>
      {titlePage && <S.TopTitle>{titlePage}</S.TopTitle>}
      <Breadcrumb>{renderBreadcrumb()}</Breadcrumb>
    </S.TopContainer>
  );
};

export default TopWrapper;
