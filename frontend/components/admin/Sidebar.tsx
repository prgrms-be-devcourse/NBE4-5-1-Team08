"use client";

import { Button } from "@/components/ui/button";

type SidebarProps = {
  selectedTab: "items" | "sales" | "addItem";
  setSelectedTab: (tab: "items" | "sales" | "addItem") => void;
};

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4">관리자 메뉴</h2>
      <div className="space-y-2">
        <Button
          className={`w-full text-left ${
            selectedTab === "items" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
          onClick={() => setSelectedTab("items")}
        >
          전체 상품 조회
        </Button>
        <Button
          className={`w-full text-left ${
            selectedTab === "sales" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
          onClick={() => setSelectedTab("sales")}
        >
          매출 조회
        </Button>
        {/* ✅ 상품 등록 버튼 추가 */}
        <Button
          className={`w-full text-left ${
            selectedTab === "addItem" ? "bg-green-500" : "bg-gray-700"
          } hover:bg-green-600`}
          onClick={() => setSelectedTab("addItem")}
        >
          상품 등록
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
