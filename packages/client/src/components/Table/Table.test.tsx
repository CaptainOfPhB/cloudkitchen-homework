import Table, { Column } from './Table';
import { render, screen } from '@testing-library/react';

interface Data {
  id?: number;
  name?: string;
  age?: number;
  gender?: string;
}

it('should render table on screen', () => {
  render(<Table dataSource={[]} columns={[]} rowKey='' />);
  const table = screen.getByTestId('table-component');
  expect(table).toMatchSnapshot();
});

it('should render \'No Data\' when list is empty', () => {
  render(<Table dataSource={[]} columns={[]} rowKey='' />);
  expect(screen.getByText('No Data')).toMatchSnapshot();
  expect(screen.getByText('No Data')).toBeInTheDocument();
});

it('should render table header', function () {
  const header = 'hello world';
  render(<Table dataSource={[]} columns={[]} rowKey='' header={header} />);
  expect(screen.getByText(header)).toBeInTheDocument();
});

it('should render columns and dataSource', function () {
  const columns: Column<Data>[] = [
    { title: 'id', dataIndex: 'id' },
    { title: 'name', dataIndex: 'name' },
  ];
  const dataSource = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  render(<Table dataSource={dataSource} columns={columns} rowKey='id' />);
  expect(screen.getByTestId('table-component')).toMatchSnapshot();
});

it('should call render callback with different params according to key and dataIndex', function () {
  const renderWhenKeyExist = jest.fn();
  const renderWhenDataIndexExist = jest.fn();
  const columns: Column<Data>[] = [
    { title: 'id', key: 'id', render: renderWhenKeyExist },
    { title: 'name', dataIndex: 'name', render: renderWhenDataIndexExist },
    { title: 'age', dataIndex: 'age' },
    { title: 'gender', key: 'gender' },
  ];
  const dataSource = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  render(<Table dataSource={dataSource} columns={columns} rowKey='id' />);
  expect(renderWhenDataIndexExist).toHaveBeenCalledTimes(2);
  expect(renderWhenKeyExist).toHaveBeenCalledTimes(2);
  expect(renderWhenDataIndexExist).toBeCalledWith(dataSource[0].name, dataSource[0], 0);
  expect(renderWhenKeyExist).toBeCalledWith(dataSource[0], 0);
});
