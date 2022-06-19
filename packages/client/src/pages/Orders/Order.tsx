import subscribe from '@/utils/fetch';
import { useEffect, useState } from 'react';
import { Order } from './types';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    subscribe<Order[]>('order_event', function (orders: Order[]) {
      console.log(orders);
    });
  }, []);

  return <div>{orders.map(order => {
    return <div>{JSON.stringify(order)}</div>;
  })}</div>;
}

export default Order;
