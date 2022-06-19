import { io } from 'socket.io-client';
import { ChangeEvent, useEffect, useState } from 'react';

import './Order.css';
import { Order } from './types';
import Table from '@/components/Table';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(function initial() {
    const socket = io('http://localhost:4000');
    socket.on('order_event', function (orders: Order[]) {
      setOrders(orders);
    });
  }, []);

  function onPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const price = e.target.value;
    console.log(price);
  }

  return (
    <div>
      <input
        type='text'
        name='order_price'
        style={{ width: 250 }}
        onChange={onPriceChange}
        placeholder='Please input order price here'
      />
      <Table<Order>
        rowKey='id'
        header='All orders'
        columns={[
          { dataIndex: 'id', title: 'ID' },
          { dataIndex: 'event_name', title: 'Event Name' },
          {
            dataIndex: 'price',
            title: 'Price',
            render: (value: number) => `$${value / 100}`,
          },
          { dataIndex: 'item', title: 'Item' },
          { dataIndex: 'customer', title: 'Customer' },
          { dataIndex: 'destination', title: 'Destination' },
        ]}
        dataSource={orders}
      />
    </div>
  );
}

export default Orders;
