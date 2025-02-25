"use client";

import { useEffect, useState } from "react";
import client from "@/app/api/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ItemType = {
  itemId?: number;
  itemName?: string;
  category?: string;
  description?: string;
  stockQuantity?: number;
  price?: number;
};

type ContentProps = {
  selectedTab: "items" | "sales";
};

const Content = ({ selectedTab }: ContentProps) => {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (selectedTab === "items") {
      const fetchItems = async () => {
        try {
          const rsData = await client.GET("/v1/items");
          if (rsData?.data?.success) {
            setItems(rsData.data.data || []);
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
                  className="bg-gray-800 text-white shadow-md"
                >
                  <CardHeader>
                    <CardTitle>{item.itemName}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>카테고리: {item.category}</p>
                    <p>재고: {item.stockQuantity}</p>
                    <p>가격: {item.price?.toLocaleString()}원</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-500">수정</Button>
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
