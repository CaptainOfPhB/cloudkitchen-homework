import { io } from 'socket.io-client';
import { ChangeEvent, useEffect, useState } from 'react';

import './Order.css';
import { Order } from './types';
import Table from '@/components/Table';

function Orders() {
  const [error, setError] = useState<string>();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(function initial() {
    const socket = io('http://localhost:4000');
    socket.on('order_event', function (incomingOrders: Order[]) {
      normalizeOrders(incomingOrders);
    });
  }, []);

  function normalizeOrders(incomingOrders: Order[]) {
    if (!orders.length) return incomingOrders;
    // setOrders(prevOrders => {
    //   const newOrders = [];
    //   const oldOrders = prevOrders.slice();
    //   const incomingOrderIds = incomingOrders.map(order => order.id);
    //   prevOrders.forEach((order, oldIdx) => {
    //     const newIdx = incomingOrderIds.indexOf(order.id);
    //     if (newIdx > -1) {
    //       const updatedOrder = { ...incomingOrders[newIdx] };
    //       oldOrders.splice(oldIdx, 1, updatedOrder);
    //     } else {
    //       newOrders.push()
    //     }
    //   });
    // });
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    // TODO: use debounce
    const input = e.target.value;
    const { error, price } = isInputValid(input);
    setError(error);
    if (!error) {
      // filterOrdersBy(price);
      setOrders(prevOrders => prevOrders.filter(order => (order.price / 100) === price));
    }
  }

  function isInputValid(value: string): { error?: string, price?: number } {
    const finalValue = Number(value.trim());
    if (!value || !value.trim()) {
      return { error: undefined, price: undefined };
    }
    if (Number.isNaN(finalValue)) {
      return { error: 'please enter a number, only valid numbers will take effect', price: undefined };
    }
    return { error: undefined, price: finalValue };
  }

  return (
    <div>
      <input
        type='text'
        name='order_price'
        style={{ width: 250 }}
        onChange={onInputChange}
        placeholder='please enter order price here'
      />
      {error && <span style={{ color: 'red', marginLeft: 10 }}>{error}</span>}
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
