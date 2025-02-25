"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { client } from "@/app/api/client";

type ItemType = {
  itemId: number;
  itemName: string;
  category: string;
  description: string;
  stockQuantity: number;
  price: number;
  imageUrl: string;
};

type ContentProps = {
  selectedTab: "items" | "sales" | "editItem";
  setSelectedTab: (tab: "items" | "sales" | "editItem") => void;
  setEditItemId: React.Dispatch<React.SetStateAction<number | null>>;
};

// ✅ 백엔드 API URL 설정
const API_BASE_URL = "http://localhost:8080/api";

const Content = ({
  selectedTab,
  setSelectedTab,
  setEditItemId,
}: ContentProps) => {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (selectedTab === "items") {
      const fetchItems = async () => {
        try {
          const rsData = await client.GET("/v1/items");
          if (rsData?.data?.success) {
            setItems(
              (rsData.data.data || []).map((item) => ({
                itemId: item.itemId ?? 0,
                itemName: item.itemName ?? "",
                category: item.category ?? "",
                description: item.description ?? "",
                stockQuantity: item.stockQuantity ?? 0,
                price: item.price ?? 0,
                imageUrl: item.imageUrl
                  ? `${API_BASE_URL}${item.imageUrl}` // API에서 받은 이미지 경로
                  : `${API_BASE_URL}/items/default.png`, // ✅ 백엔드 제공 기본 이미지 경로로 변경
              }))
            );
          }
        } catch (error) {
          console.error("상품 데이터를 불러오는 중 오류 발생:", error);
          setItems([]);
        }
      };
      fetchItems();
    }
  }, [selectedTab]);

  return (
    <div className="w-4/5 p-6 flex-grow overflow-auto">
      {selectedTab === "items" ? (
        <div>
          <h2 className="text-xl font-bold mb-4">전체 상품 목록</h2>
          <div className="grid grid-cols-3 gap-4">
            {items.length > 0 ? (
              items.map((item) => (
                <Card
                  key={item.itemId}
                  className="bg-gray-800 text-white shadow-md p-4 min-w-[250px] min-h-[300px]"
                >
                  <CardHeader>
                    <CardTitle>{item.itemName}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* ✅ 이미지 정상적으로 불러오기 */}
                    <div className="flex justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-[200px] h-[200px] object-cover rounded border border-red-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/default.png"; // 오류 발생 시 기본 이미지 대체
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-300">
                      카테고리: {item.category}
                    </p>
                    <p className="text-sm text-gray-300">
                      재고: {item.stockQuantity}
                    </p>
                    <p className="text-sm text-gray-300">
                      가격: {item.price?.toLocaleString()}원
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      className="bg-green-500"
                      onClick={() => {
                        setEditItemId(item.itemId);
                        setSelectedTab("editItem");
                      }}
                    >
                      수정
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-gray-300">상품이 없습니다.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">매출 조회</h2>
          <Card className="bg-gray-800 text-white shadow-md p-6">
            <p>매출 데이터를 표시할 공간입니다.</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Content;
