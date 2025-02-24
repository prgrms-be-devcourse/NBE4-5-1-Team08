import ClientOrdersPage from "@/app/orders/ClientOrdersPage";
import client from "@/app/api/client";

const OrderPage = async () => {

    const rsData = await client.GET(`/v1/items/{itemId}`, {
        params: {path: {itemId: id}}
    });

    return <ClientOrdersPage/>
}
export default OrderPage;
