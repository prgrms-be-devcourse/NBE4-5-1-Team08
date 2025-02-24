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
import { client } from "@/app/api/client";

type ItemFormProps = {
  itemFormProps?: {
    itemName?: string;
    category?: string;
    description?: string;
    stockQuantity?: number;
    price?: number;
  };
  itemId?: number;
  isEditMode: boolean;
  setSelectedTab: (tab: "items") => void;
};

const ItemForm = ({
  itemFormProps,
  isEditMode,
  itemId,
  setSelectedTab,
}: ItemFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemName: itemFormProps?.itemName ?? "",
    category: itemFormProps?.category ?? "",
    description: itemFormProps?.description ?? "",
    stockQuantity: itemFormProps?.stockQuantity ?? 0,
    price: itemFormProps?.price ?? 0,
    imageUrl: "/static/default.png", // ✅ 기본 이미지 URL 설정
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) {
      console.error("itemId가 존재하지 않습니다.");
      return;
    }

    if (confirm("삭제하시겠습니까?")) {
      try {
        await client.DELETE("/v1/items/{itemId}", {
          params: { path: { itemId } },
        });
        setSelectedTab("items");
      } catch (error) {
        console.error("상품 삭제 실패:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        if (!itemId) {
          console.error("수정할 itemId가 존재하지 않습니다.");
          return;
        }
        await client.PUT("/v1/items/{itemId}", {
          params: { path: { itemId } },
          body: formData,
        });
      } else {
        await client.POST("/v1/items", {
          body: formData,
        });
      }
      setSelectedTab("items");
    } catch (error) {
      console.error("상품 등록/수정 실패:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-[350px] bg-gray-800 text-white">
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

                <Label htmlFor="stockQuantity">재고 수량</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
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
