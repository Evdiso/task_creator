import React from 'react'
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortAmountDown, faSortAmountUpAlt} from '@fortawesome/free-solid-svg-icons';

const Table = props => {


  const renderByType = (item, index) => {
    if (item.enableSort) {
      return (
        <div className={'sort-th'}>
          {item.text}
          <span onClick={() => props.onClick(item.type, index)}>
            {
              item.sortable
                ? <FontAwesomeIcon
                  icon={faSortAmountDown} />
                : <FontAwesomeIcon
                  icon={faSortAmountUpAlt} />
            }
          </span>
        </div>
      )
    } else {
      return (
        <span>{item.text}</span>
      )
    }
  };

  const renderTh = () => {
    return props.tableHeadCol.map((item, index) => {
      return (
        <th key={item.text + index}
            className={item.enableSort ? '' : 'st-th'}>
          {
            renderByType(item, index)
          }
        </th>
      )
    });
  };

  return (
    <table className="uk-table uk-table-middle uk-table-divider task-table">
      <thead>
      <tr>
        {renderTh()}
      </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
};

const getMapStateToProps = state => {
  return {
    tableHeadCol: state.taskListReducer.tableHeadCol
  }
};

export default connect(getMapStateToProps)(Table)