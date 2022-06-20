import { io } from 'socket.io-client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import './Order.css';
import { Order } from './types';
import Table from '@/components/Table';
import debounce from '@/utils/debounce';

function Orders() {
  const [error, setError] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [orders, setOrders] = useState<Order[]>([]);

  const listenerRef = useRef<(orders: Order[]) => void>();

  function listener(incomingOrders: Order[]) {
    const normalizedOrders = normalizeOrders(incomingOrders);
    setOrders(normalizedOrders);
  }

  useEffect(function setListener() {
    listenerRef.current = listener;
  });

  useEffect(function initial() {
    const socket = io('http://localhost:4000');

    function onOrderEventCome(orders: Order[]) {
      if (listenerRef.current) {
        listenerRef.current(orders);
      }
    }

    socket.on('order_event', onOrderEventCome);
    return () => void socket.off('order_event', onOrderEventCome);
  }, []);

  function normalizeOrders(incomingOrders: Order[]): Order[] {
    const finalOrders = [...orders];
    incomingOrders.forEach(order => {
      const finalOrderIds = finalOrders.map(order => order.id);
      const index = finalOrderIds.indexOf(order.id);
      if (index > -1) {
        finalOrders.splice(index, 1, { ...order });
      } else {
        finalOrders.push(order);
      }
    });
    return finalOrders;
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const { error, price } = isInputValid(input);
    setError(error);
    setPrice(price);
  }

  function filterOrders(orders: Order[], price?: number) {
    if (!price) return orders;
    return orders.filter(order => (order.price / 100) === price);
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

  const displayedOrders = filterOrders(orders, price);

  return (
    <div>
      <input
        type='text'
        name='order_price'
        style={{ width: 250 }}
        onChange={debounce(onInputChange)}
        placeholder='please enter order price here'
      />
      {error && <span style={{ color: 'red', marginLeft: 10 }}>{error}</span>}
      <Table<Order>
        rowKey='id'
        header={price ? `${displayedOrders.length} orders matched with price $${price}` : 'All orders'}
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
        dataSource={displayedOrders}
      />
    </div>
  );
}

export default Orders;
