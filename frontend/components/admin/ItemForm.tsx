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
import { clientFormData } from "@/app/api/client";

type ItemFormProps = {
  itemFormProps?: {
    itemName?: string;
    category?: string;
    description?: string;
    price?: number;
    stockQuantity?: number;
  };
  itemId?: number;
  isEditMode: boolean;
  setSelectedTab: (tab: "items") => void;
};

const ItemForm = ({ itemFormProps, isEditMode, itemId }: ItemFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemName: itemFormProps?.itemName ?? "",
    category: itemFormProps?.category ?? "",
    description: itemFormProps?.description ?? "",
    price: itemFormProps?.price ?? 0,
    stockQuantity: itemFormProps?.stockQuantity ?? 0,
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

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm("삭제하시겠습니까?") && itemId) {
      await clientFormData.DELETE("/v1/items/{itemId}", {
        params: { path: { itemId } }, // 기존 DELETE 방식 유지
        credentials: "include",
      });
      router.push("/admin/items");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FormData를 사용하지 않고, query 파라미터에 포함
    const requestData = {
      requestForm: {
        itemName: formData.itemName,
        category: formData.category,
        description: formData.description,
        stockQuantity: formData.stockQuantity,
        price: formData.price,
        itemImage: itemImage ? itemImage.name : undefined, // 이미지 파일명만 포함
      },
    };

    try {
      if (isEditMode && itemId) {
        await clientFormData.PUT("/v1/items/{itemId}", {
          params: {
            path: { itemId }, // 기존 방식 유지
            query: requestData, // `query` 파라미터 활용
          },
          credentials: "include",
        });
      } else {
        await clientFormData.POST("/v1/items", {
          params: {
            query: requestData, // `query` 파라미터 활용
          },
          credentials: "include",
        });
      }

      router.push("/admin/items");
    } catch (error) {
      console.error("상품 등록/수정 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-[400px] bg-gray-800 text-white">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditMode ? "상품 수정" : "상품 등록"}</CardTitle>
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

                <Label htmlFor="stockQuantity">수량</Label>
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
            <Button type="submit" className="bg-blue-500">
              {isEditMode ? "수정" : "등록"}
            </Button>
            {isEditMode && (
              <Button onClick={handleDelete} className="bg-red-500">
                삭제
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ItemForm;
