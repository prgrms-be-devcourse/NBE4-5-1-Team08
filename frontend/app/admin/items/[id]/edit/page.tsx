import {client} from "@/app/api/client";
import ItemForm from "@/components/items/ItemForm";

const EditItemPage = async ({params}: { params: { id: number } }) => {
    const {id} = await params;
    const rsData = await client.GET(`/v1/items/{itemId}`, {
        params: {path: {itemId: id}}
    });

    return rsData?.data?.success && rsData.data.data
        ? <ItemForm itemFormProps={rsData.data.data} itemId={id} isEditMode={true}/>
        : <div>{rsData.data!.message}</div>;
};

export default EditItemPage;