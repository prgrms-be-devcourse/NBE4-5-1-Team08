export interface CartItem {
    itemId: number;
    itemName: string;
    quantity: number;
    price: number;
}

interface OrderPayload {
    itemList: {
        itemId: number;
        quantity: number;
    }[];
    memberEmail: string;
    memberPassword: string;
    memberAddress: string;
}
