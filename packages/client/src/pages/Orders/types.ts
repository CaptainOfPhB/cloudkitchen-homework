export interface Order {
  id: string;
  event_name: EventName;
  price: number;
  item: string;
  customer: string;
  destination: string;
}

type EventName = 'CREATED' | 'COOKED' | 'DELIVERED' | 'DRIVER_RECEIVED' | 'CANCELLED';
