import React from 'react'
import {connect} from "react-redux";

const Table = props => {


  const renderByType = (item, index) => {
    if (item.enableSort) {
      return (
        <div className={'sort-th'}>
          {item.text}
           <span uk-icon={`icon: ${ item.sortable ? "triangle-up" : "triangle-down"}`}
          onClick={() => props.onClick(item.type, index)}>
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