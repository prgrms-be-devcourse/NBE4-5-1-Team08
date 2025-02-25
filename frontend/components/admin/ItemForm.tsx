"use client";

import React, { useState, useEffect } from "react";
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
  itemId?: number;
  isEditMode: boolean;
  setSelectedTab: (tab: "items") => void;
};

const ItemForm = ({ itemId, isEditMode, setSelectedTab }: ItemFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    imageUrl: "/static/default.png",
  });

  useEffect(() => {
    const fetchItemData = async () => {
      if (isEditMode && itemId) {
        try {
          const rsData = await client.GET("/v1/items/{itemId}", {
            params: { path: { itemId } },
          });

          // ✅ 데이터가 존재하는 경우에만 상태 업데이트
          if (rsData?.data?.success && rsData.data.data) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...rsData.data.data,
            }));
          }
        } catch (error) {
          console.error("상품 정보를 불러오는 중 오류 발생:", error);
        }
      }
    };

    fetchItemData();
  }, [isEditMode, itemId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode && itemId) {
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
                itemImage: formData.imageUrl, // 기본 이미지 URL 유지
              },
            },
          },
        });
      } else {
        await client.POST("/v1/items", {
          params: {
            query: {
              requestForm: {
                itemName: formData.itemName,
                category: formData.category,
                description: formData.description,
                stockQuantity: formData.stockQuantity,
                price: formData.price,
                itemImage: formData.imageUrl, // 기본 이미지 URL 유지
              },
            },
          },
        });
      }

      setSelectedTab("items");
    } catch (error) {
      console.error("상품 등록/수정 중 오류 발생:", error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) {
      console.error("삭제할 상품 ID가 없습니다.");
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
