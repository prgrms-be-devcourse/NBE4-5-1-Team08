'use client';

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import client from "@/app/api/client";


type ItemFormProps = {
    itemFormProps?: {
        itemId?: number;
        itemName?: string;
        category?: string;
        description?: string;
        stockQuantity?: number;
    };
    isEditMode: boolean;
};


const ItemForm = ({itemFormProps, isEditMode}: ItemFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        itemName: itemFormProps?.itemName ?? "",
        category: itemFormProps?.category ?? "",
        description: itemFormProps?.description ?? "",
        stockQuantity: itemFormProps?.stockQuantity ?? 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (isEditMode) {
            console.log(formData);
        } else {
            await client.POST(`/v1/items`, {
                body: formData,
            });
        }
        router.push("/admin/items");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-[350px]">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 gap-2">
                                <Label htmlFor="itemName">상품명</Label>
                                <Input id="itemName" name="itemName" value={formData.itemName} onChange={handleChange}
                                       placeholder="Name of your project"/>
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
                                <Label htmlFor="stockQuantity">수량</Label>
                                <Input id="stockQuantity" type="number" name="stockQuantity"
                                       value={formData.stockQuantity} onChange={handleChange}
                                       placeholder="Name of your project"/>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">취소</Button>
                        <Button type={"submit"}>등록</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ItemForm;