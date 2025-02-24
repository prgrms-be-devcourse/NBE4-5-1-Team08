import {client} from "@/app/api/client";
import ClientHomePage from "@/app/ClientHomePage";

const HomePage = async () => {
    let rsData;

    try {
        rsData = await client.GET('/v1/items');

        if (!rsData?.data?.success || !rsData.data.data) {
            return <div>데이터 로드 실패</div>
        }

        const filteredItems = rsData.data.data.filter(item => item.stockQuantity > 0);

        return <ClientHomePage itemList={filteredItems}/>;
    } catch (error) {
        console.error("상품 데이터를 불러오는 중 오류 발생:", error);
        return <div>상품 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.</div>;
    }
};

export default HomePage;