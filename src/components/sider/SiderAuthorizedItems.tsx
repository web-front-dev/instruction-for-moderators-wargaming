import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { authorizedMenuItems, authorizedSubMenuItems } from 'data'
import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { DispatchType } from 'store'
import { actions } from 'store/authReducer'

const SiderAuthorizedItems: FC = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch<DispatchType>()

  const handleClick = useCallback(() => {
    localStorage.removeItem('name')
    dispatch(actions.setIsAuth(false))
  }, [dispatch])

  return (
    <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
      {authorizedMenuItems.map(({ title, Icon, link }) => {
        return (
          <Menu.Item
            key={link}
            icon={<Icon />}
            onClick={link === '/login' ? handleClick : undefined}
          >
            <Link to={link}>{title}</Link>
          </Menu.Item>
        )
      })}
      {authorizedSubMenuItems.map(({ Icon, title, Children }, index) => {
        return (
          <SubMenu icon={<Icon />} key={index} title={title}>
            <Children />
          </SubMenu>
        )
      })}
    </Menu>
  )
}

export default SiderAuthorizedItems
