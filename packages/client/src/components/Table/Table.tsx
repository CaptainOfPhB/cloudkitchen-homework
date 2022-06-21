import './Table.css';
import type { CSSProperties, Key, ReactNode } from 'react';

interface ColumnWithDataIndex<T = {}> {
  dataIndex: keyof T;
  title: ReactNode;
  style?: CSSProperties;
  render?: (value: any, record: T, index: number) => ReactNode;
}

interface ColumnWithKey<T = {}> {
  key: string;
  title: ReactNode;
  style?: CSSProperties;
  render?: (record: T, index: number) => ReactNode;
}

export type Column<T> = ColumnWithDataIndex<T> | ColumnWithKey<T>;

interface TableProps<T> {
  dataSource: T[];
  columns: Column<T>[];
  header?: ReactNode;
  rowKey: keyof T;
}

function Table<T>(props: TableProps<T>) {
  return (
    <table className='table-component' data-testid='table-component'>
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
          const key = (column as ColumnWithDataIndex).dataIndex || (column as ColumnWithKey).key;
          return (
            <th className='table-cell' style={column.style} key={key}>
              {column.title}
            </th>
          );
        })}
      </tr>
      {props.dataSource.length
        ? props.dataSource.map((each, index) => {
          return (
            <tr key={each[props.rowKey] as unknown as Key} className='table-row'>
              {props.columns.map(column => {
                const key = (column as ColumnWithDataIndex).dataIndex || (column as ColumnWithKey).key;
                return (
                  <td className='table-cell' style={column.style} key={key}>
                    <>
                      {column.render
                        ? 'dataIndex' in column
                          ? column.render(each[column.dataIndex], each, index)
                          : column.render(each, index)
                        : 'dataIndex' in column
                          ? each[column.dataIndex]
                          : null
                      }
                    </>
                  </td>
                );
              })}
            </tr>
          );
        })
        : (
          <tr className='table-row'>
            <th rowSpan={5} colSpan={props.columns.length} className='table-empty-content'>
              No Data
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;