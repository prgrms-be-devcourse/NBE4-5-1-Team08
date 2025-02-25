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
import { components } from "@/lib/api/schema"; // API 스키마 가져오기

type CategoryType = components["schemas"]["CategoryDto"];

type ItemFormProps = {
  itemId?: number;
  isEditMode: boolean;
  setSelectedTab: (tab: "items") => void;
};

const ItemForm = ({ itemId, isEditMode, setSelectedTab }: ItemFormProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    itemImage: "",
  });

  // ✅ 카테고리 목록 불러오기 (유효한 API 요청 확인)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const rsData = await client.GET("/v1/categories", {});

        if (rsData?.data?.success && Array.isArray(rsData.data.data)) {
          setCategories(rsData.data.data);
        } else {
          console.error("카테고리 데이터를 불러오는 중 오류 발생");
        }
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ 상품 정보 불러오기 (수정 모드일 때)
  useEffect(() => {
    const fetchItemData = async () => {
      if (isEditMode && itemId) {
        try {
          const rsData = await client.GET("/v1/items/{itemId}", {
            params: { path: { itemId } },
          });

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

  // ✅ 입력 필드 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 상품 등록 및 수정 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const itemData = {
        itemName: formData.itemName,
        category: formData.category,
        description: formData.description,
        stockQuantity: formData.stockQuantity,
        price: formData.price,
        itemImage: formData.itemImage,
      };

      if (isEditMode && itemId) {
        await client.PUT("/v1/items/{itemId}", {
          params: {
            path: { itemId },
            query: { requestForm: itemData },
          },
        });
      } else {
        await client.POST("/v1/items", {
          params: { query: { requestForm: itemData } },
        });
      }

      setSelectedTab("items");
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
              <Label htmlFor="itemName">상품명</Label>
              <Input
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

              <Label htmlFor="category">카테고리</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded text-black"
                required
              >
                <option value="">카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

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

              {/* ✅ 카테고리 추가 기능 (현재 제거됨) */}
              {/* <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="새 카테고리 입력"
                  className="p-2 border rounded text-black"
                />
                <Button onClick={handleAddCategory} disabled={!newCategory.trim()}>
                  추가
                </Button>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
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
