import { OrderedItem } from './ordered-item';

export class Order {
	id: number;
	date: string;
	responsible: string;
	items: OrderedItem[] = [];
}
