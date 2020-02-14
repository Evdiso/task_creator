import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faChartBar, faListAlt, faFileAlt, faColumns} from '@fortawesome/free-solid-svg-icons';


const links = [
  {to: '/', label: 'Статистика', icon: 'faChartBar', exact: true},
  {to: '/task-list', label: 'Список задач', icon: 'faListAlt', exact: true},
  {to: '/new-task', label: 'Добавление задачи', icon: 'faFileAlt', exact: true},
  {to: '/scrum', label: 'Scrum доска', icon: 'faColumns', exact: true},
];

const Sidebar = props => {

  let wrapperAside = 'wrapper-aside';
  let overlayAside = 'overlay-aside';
  let isOpen = props.sidebarActive;
  if (isOpen) {
    wrapperAside += ' active';
    overlayAside += ' active';
  }

  const selectIcon = type => {
    switch (type) {
      case 'faChartBar':
        return <FontAwesomeIcon icon={faChartBar} />;
      case 'faListAlt':
        return <FontAwesomeIcon icon={faListAlt} />;
      case 'faFileAlt':
        return <FontAwesomeIcon icon={faFileAlt} />;
      case 'faColumns':
        return <FontAwesomeIcon icon={faColumns} />;
      default:
    }
  };

  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li className={'task'} key={index}>
          <NavLink to={link.to}
                   exact={link.exact}
                   onClick={props.onActiveSidebarHandler}
                   activeClassName={'task-active'}>
            {selectIcon(link.icon)}
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
            <FontAwesomeIcon icon={faTimes} />
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