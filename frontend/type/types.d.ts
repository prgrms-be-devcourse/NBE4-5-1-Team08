export interface CartItem {
    itemId: number;
    itemName: string;
    quantity: number;
    price: number;
}

interface OrderPayload {
    items: {
        itemId: number;
        quantity: number;
    }[];
    email: string;
    password: string;
    address: string;
}
