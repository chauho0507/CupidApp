import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTER } from '../../constants/router';

import * as S from './styles';

const SIDEBAR_ITEMS = [
  {
    title: 'Home',
    path: ROUTER.USER.HOME,
  },
  {
    title: 'Product List',
    path: ROUTER.USER.PRODUCT_LIST,
  },
];

function Sidebar() {
  let history = useHistory();
  let location = useLocation();

  const { isShowSidebar } = useSelector(state => state.commonReducer);

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <S.SidebarItem
          item={item}
          location={location}
          key={index}
          onClick={() => history.push(item.path)}
        >
          {item.title}
        </S.SidebarItem>
      );
    });
  };
  return <S.Sidebar active={isShowSidebar}>{renderSidebarItems()}</S.Sidebar>;
}

export default Sidebar;
