import {client} from "@/app/api/client";
import ClientHomePage from "@/app/ClientHomePage";

const HomePage = async () => {
    const rsData = await client.GET('/v1/items');

    return (
        <>
            {rsData?.data?.success ? (
                <ClientHomePage itemList={rsData.data.data!}/>
            ) : (
                <div>failed</div>
            )}
        </>
    );
}
export default HomePage;
