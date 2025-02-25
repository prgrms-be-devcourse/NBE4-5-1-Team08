"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { client, clientFormData } from "@/app/api/client";

type ItemFormProps = {
  isEditMode: boolean;
  itemId?: number;
  setSelectedTab?: (tab: "items") => void; // ✅ 등록 후 리스트로 이동을 위해 추가
};

const ItemForm = ({ isEditMode, itemId, setSelectedTab }: ItemFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    price: 0,
    stockQuantity: 0,
  });
  const [itemImage, setItemImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setItemImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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

    try {
      if (isEditMode && itemId) {
        if (itemImage) {
          // ✅ FormData 전송 (이미지 포함)
          await clientFormData.PUT("/v1/items/{itemId}", {
            params: { path: { itemId } }, // ✅ `query` 제거
            body: formDataToSend, // ✅ FormData 직접 전송
          });
        } else {
          // ✅ JSON 데이터 전송 (이미지 없음)
          await client.PUT("/v1/items/{itemId}", {
            params: {
              path: { itemId },
              query: {
                requestForm: {
                  itemName: formData.itemName,
                  category: formData.category,
                  description: formData.description,
                  stockQuantity: formData.stockQuantity,
                  price: formData.price,
                },
              },
            },
          });
        }
      } else {
        await clientFormData.POST(`/v1/items`, {
          body: formDataToSend, // ✅ FormData 직접 전송
        });
      }

      setSelectedTab?.("items"); // ✅ 등록 후 아이템 리스트로 이동
    } catch (error) {
      console.error("상품 등록/수정 중 오류 발생:", error);
    }
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
                <Input
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="itemImage">상품 이미지</Label>
                <Input
                  id="itemImage"
                  name="itemImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Label htmlFor="category">카테고리</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="description">상품 설명</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <Label htmlFor="price">가격</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="stockQuantity">재고 수량</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">{isEditMode ? "수정" : "등록"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ItemForm;
