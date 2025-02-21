import client from "@/app/api/client";
import ItemForm from "@/components/items/ItemForm";

const EditItemPage = async ({params}: { params: { id: number } }) => {
    const rsData = await client.GET(`/v1/items/{itemId}`, {
        params: {path: {itemId: params.id}}
    });

    return rsData?.data?.success && rsData.data.data
        ? <ItemForm itemFormProps={rsData.data.data} isEditMode={true}/>
        : <div>{rsData.data!.message}</div>;
};

export default EditItemPage;