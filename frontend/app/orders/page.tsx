import ClientOrdersPage from "@/app/orders/ClientOrdersPage";
import {client} from "@/app/api/client";

const OrderPage = async ({params}: { params: { id: number } }) => {
    const {id} = await params;

    const rsData = await client.GET(`/v1/items/{itemId}`, {
        params: {path: {orderId: id}}
    });

    return <ClientOrdersPage/>
}
export default OrderPage;
