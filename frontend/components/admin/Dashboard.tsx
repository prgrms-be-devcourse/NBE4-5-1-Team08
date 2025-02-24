"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Content from "@/components/admin/Content";
import ItemForm from "@/components/admin/ItemForm";
import Header from "../Header";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<"items" | "sales" | "addItem">(
    "items"
  );
  const pathname = usePathname();

  return (
    <div className="absolute inset-0 w-screen h-screen flex flex-col bg-gray-900 text-white !p-0 !m-0">
      {/* ✅ 헤더 유지 */}
      <Header />

      {/* ✅ 헤더 아래 검정 구분선 추가 */}
      <div className="border-b border-gray-800"></div>

      {/* ✅ 대시보드 본문 (헤더/푸터 제외한 영역을 정확하게 채움) */}
      <main className="flex flex-grow w-full h-[calc(100vh-4rem-2rem)]">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex flex-col flex-grow p-6">
          {selectedTab === "addItem" ? (
            <div className="flex justify-center items-center h-full">
              <ItemForm isEditMode={false} setSelectedTab={setSelectedTab} />
            </div>
          ) : (
            <Content selectedTab={selectedTab} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
