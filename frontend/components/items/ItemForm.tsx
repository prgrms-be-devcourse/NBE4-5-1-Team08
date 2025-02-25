"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {client, clientFormData} from "@/app/api/client";


type ItemFormProps = {
    itemFormProps?: {
        itemName?: string;
        category?: string;
        description?: string;
        price?: number;
        stockQuantity?: number;
    };
    itemId?: number;
    itemImage?: File | null;
    isEditMode: boolean;
};


const ItemForm = ({itemFormProps, isEditMode, itemId}: ItemFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        itemName: itemFormProps?.itemName ?? "",
        category: itemFormProps?.category ?? "",
        description: itemFormProps?.description ?? "",
        price: itemFormProps?.price ?? 0,
        stockQuantity: itemFormProps?.stockQuantity ?? 0,
    });
    const [itemImage, setItemImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setItemImage(file);
        }
    };

    const handleDelete = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (confirm('삭제하시겠습니까?')) {
            await client.DELETE('/v1/items/{itemId}', {
                params: {path: {itemId: itemId!}},
            })
            router.push("/admin/items");
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("itemName", formData.itemName);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price.toString());
        formDataToSend.append("stockQuantity", formData.stockQuantity.toString());

        if (itemImage) {
            formDataToSend.append("itemImage", itemImage);
        }

        if (isEditMode) {
            await clientFormData.PUT('/v1/items/{itemId}', {
                params: {path: {itemId: itemId!}},
                body: formDataToSend,
            })
        } else {
            await clientFormData.POST(`/v1/items`, {
                body: formDataToSend,
            });
        }
        router.push("/admin/items");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-[350px]">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>상품 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 gap-2">
                                <Label htmlFor="itemName">상품명</Label>
                                <Input id="itemName" name="itemName" value={formData.itemName} onChange={handleChange}
                                       placeholder="Name of your project"/>
                                <Label htmlFor="itemImage">상품이미지</Label>
                                <Input id="itemImage" name="itemImage" type="file" accept="image/*"
                                       onChange={handleImageChange}/>
                                <Label htmlFor="category">카테고리</Label>
                                <Input id="category" name="category" value={formData.category} onChange={handleChange}
                                       placeholder="Name of your project"/>
                                {/*TODO select 카테고리로 변경*/}
                                {/*<Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>*/}
                                {/*    <SelectTrigger id="framework">*/}
                                {/*        <SelectValue placeholder="Select"/>*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent position="popper">*/}
                                {/*        <SelectItem value="next">Next.js</SelectItem>*/}
                                {/*        <SelectItem value="sveltekit">SvelteKit</SelectItem>*/}
                                {/*        <SelectItem value="astro">Astro</SelectItem>*/}
                                {/*        <SelectItem value="nuxt">Nuxt.js</SelectItem>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                                <Label htmlFor="description">상품 설명</Label>
                                <Textarea id="description" name="description" value={formData.description}
                                          onChange={handleChange}
                                          placeholder="Name of your project"/>
                                <Label htmlFor="stockQuantity">가격</Label>
                                <Input id="price" type="number" name="price"
                                       value={formData.price} onChange={handleChange}
                                       placeholder="Name of your project"/>
                                <Label htmlFor="stockQuantity">수량</Label>
                                <Input id="stockQuantity" type="number" name="stockQuantity"
                                       value={formData.stockQuantity} onChange={handleChange}
                                       placeholder="Name of your project"/>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit">{isEditMode ? '수정' : '등록'}</Button>
                        {isEditMode && <Button onClick={handleDelete} variant={"destructive"}> 삭제</Button>}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ItemForm;