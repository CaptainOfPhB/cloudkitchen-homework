export interface Order {
  id: string;
  event_name: 'CREATED' | 'UPDATED';
  price: number;
  item: string;
  customer: string;
  destination: string;
}