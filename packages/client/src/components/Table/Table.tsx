import './Table.css';
import type { CSSProperties, Key, ReactNode } from 'react';

interface Column<T> {
  dataIndex?: keyof T;
  title: ReactNode;
  style?: CSSProperties;
  render?: (value: any, record: T) => ReactNode;
}

interface TableProps<T> {
  dataSource: T[];
  columns: Column<T>[];
  header?: ReactNode;
  rowKey: keyof T;
}

function Table<T>(props: TableProps<T>) {
  return (
    <table className='table-component'>
      {props.header && (
        <thead>
        <tr>
          <th colSpan={props.columns.length} className='table-header'>
            {props.header}
          </th>
        </tr>
        </thead>
      )}
      <tbody>
      <tr className='table-column-title'>
        {props.columns.map(column => {
          return (
            <th
              className='table-cell'
              style={column.style}
              key={column.dataIndex as string}
            >
              {column.title}
            </th>
          );
        })}
      </tr>
      {props.dataSource.length
        ? props.dataSource.map(each => {
          return (
            <tr key={each[props.rowKey] as unknown as Key} className='table-row'>
              {props.columns.map(column => {
                const value = each[column.dataIndex as keyof T];
                return (
                  <td
                    className='table-cell'
                    style={column.style}
                    key={column.dataIndex as string}
                  >
                    <>{column.render ? column.render(value, each) : value}</>
                  </td>
                );
              })}
            </tr>
          );
        })
        : (
          <tr className='table-row'>
            <th rowSpan={5} colSpan={props.columns.length} className='table-empty-content'>
              No data
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;