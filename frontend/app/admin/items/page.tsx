import client from "@/app/api/client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const ItemListPage = async () => {
    const apiResponse = await client.GET('/items');
    return (
        apiResponse?.data?.success ?
            apiResponse.data.data!.map((item) => (
                <Card key={item.itemId}>
                    <CardHeader>
                        <CardTitle>{item.itemName}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>{item.stockQuantity}</p>
                    </CardFooter>
                </Card>
            ))
            :
            <div>{apiResponse.data!.message}</div>
    )
}
export default ItemListPage;
