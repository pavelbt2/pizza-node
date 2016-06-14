import { OrderedItem } from './ordered-item';
import { OrderStatus } from './order-status';

export class Order {
	id: number;
	date: Date;
	responsible: string;
	status: OrderStatus;
	valid: boolean;
	items: OrderedItem[] = [];
}
