"use client";

import React, { useEffect, useState } from "react";
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

const API_BASE_URL = "http://localhost:8080/api";

type ItemFormProps = {
  isEditMode: boolean;
  itemId?: number;
  setSelectedTab?: (tab: "items") => void;
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
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/categories`);
        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const rsData = await response.json();
        console.log("📌 카테고리 데이터:", rsData.data);

        if (rsData?.success) {
          setCategories(rsData.data || []);
        }
      } catch (error) {
        console.error("❌ 카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ 상품 데이터 불러오기 (수정 모드일 경우)
  useEffect(() => {
    if (isEditMode && itemId) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/v1/items/${itemId}`);
          if (!response.ok) {
            throw new Error(`서버 응답 오류: ${response.status}`);
          }

          const rsData = await response.json();

          if (rsData?.success) {
            const item = rsData.data;
            setFormData({
              itemName: item.itemName,
              category: item.category,
              description: item.description,
              price: item.price,
              stockQuantity: item.stockQuantity,
            });
          }
        } catch (error) {
          console.error("❌ 상품 데이터를 불러오는 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [isEditMode, itemId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setItemImage(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    if (!itemId) return;

    const confirmDelete = window.confirm("정말로 이 상품을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/v1/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      console.log("✅ 상품 삭제 성공!");
      setSelectedTab?.("items"); // ✅ 삭제 후 상품 목록으로 이동
      router.refresh();
    } catch (error) {
      console.error("❌ 상품 삭제 중 오류 발생:", error);
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
      let response;
      if (isEditMode && itemId) {
        response = await fetch(`${API_BASE_URL}/v1/items/${itemId}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        response = await fetch(`${API_BASE_URL}/v1/items`, {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      console.log(`✅ 상품 ${isEditMode ? "수정" : "등록"} 성공!`);
      setSelectedTab?.("items");
      router.refresh();
    } catch (error) {
      console.error(
        `❌ 상품 ${isEditMode ? "수정" : "등록"} 중 오류 발생:`,
        error
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditMode ? "상품 수정" : "상품 등록"}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">상품 정보를 불러오는 중...</p>
            ) : (
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
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded p-2 bg-gray-800 text-white"
                    required
                  >
                    <option value="">카테고리 선택</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryName}
                      >
                        {category.categoryName}
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
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">{isEditMode ? "수정" : "등록"}</Button>
            {isEditMode && (
              <Button
                type="button"
                className="bg-red-500"
                onClick={handleDelete}
              >
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
