import { OrderedItem } from './ordered-item';

export class Order {
	id: number;
	date: Date;
	responsible: string;
	items: OrderedItem[] = [];
}
