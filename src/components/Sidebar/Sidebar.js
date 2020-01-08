import React, {Fragment} from 'react'
import {NavLink} from "react-router-dom";

const links = [
  {to: '/', label: 'Статистика', icon: 'icon: file-text; ratio: 2', exact: true},
  {to: '/task-list', label: 'Список задач', icon: 'icon: list; ratio: 2', exact: true},
  {to: '/new-task', label: 'Добавление задачи', icon: 'icon: pencil; ratio: 2', exact: true},
  {to: '/scrum', label: 'Scrum доска', icon: 'icon: album; ratio: 2', exact: true},
];

const Sidebar = props => {

  let wrapperAside = 'wrapper-aside';
  let overlayAside = 'overlay-aside';
  let isOpen = props.sidebarActive;
  if (isOpen) {
    wrapperAside += ' active';
    overlayAside += ' active';
  }

  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li className={'task'} key={index}>
          <NavLink to={link.to}
                   exact={link.exact}
                   onClick={props.onActiveSidebarHandler}
                   activeClassName={'task-active'}>
            <span uk-icon={link.icon}></span>
            {link.label}
          </NavLink>
        </li>
      )
    });
  };


  return (
    <Fragment>
      <div className={overlayAside} onClick={props.onActiveSidebarHandler}>
      </div>
      <aside className={wrapperAside}>
        <div className={'wrapper-btn'}>
          <button className='btn-close'
                  onClick={props.onActiveSidebarHandler}>
            <span uk-icon="icon: close; ratio: 2"></span>
          </button>
        </div>

        <ul className='task-list'>
          {renderLinks()}
        </ul>
      </aside>
    </Fragment>
  )
};

export default Sidebar