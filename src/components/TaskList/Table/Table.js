import React from 'react'

const Table = props => {
  return (
    <table className="uk-table uk-table-middle uk-table-divider task-table">
      <thead>
      <tr>
        <th className={'st-th'}>
          <span>№</span>
        </th>
        <th className={'st-th'}>
          <span>Описание задачи</span>
        </th>
        <th>
          <div className={'sort-th'}>
            Дата создания
            <span uk-icon="icon: triangle-down"
                  onClick={props.onClick}>
            </span>
          </div>
        </th>
        <th>
          <div className={'sort-th'}>
            Дата обновления
            <span uk-icon="icon: triangle-down"
                  onClick={props.onClick}>
            </span>
          </div>
        </th>
        <th>
          <div className={'sort-th'}>
            Статус задачи
            <span uk-icon="icon: triangle-down"
                  onClick={props.onClick}>
            </span>
          </div>
        </th>
        <th>
          <div className={'sort-th'}>
            Приоритет
            <span uk-icon="icon: triangle-down"
                  onClick={props.onClick}>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
};

export default Table