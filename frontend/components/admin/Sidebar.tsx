"use client";

import { useRouter } from "next/navigation";

type SidebarProps = {
  selectedTab: "items" | "sales" | "addItem";
  setSelectedTab: (tab: "items" | "sales" | "addItem") => void;
};

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("isAuthenticated"); // ✅ 로그아웃 후 로컬 스토리지 업데이트
    router.replace("/"); // ✅ 로그인 페이지로 이동
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
      <div>
        <button
          className={`w-full p-4 ${
            selectedTab === "items" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedTab("items")}
        >
          전체 상품 조회
        </button>
        <button
          className={`w-full p-4 ${
            selectedTab === "sales" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedTab("sales")}
        >
          매출 조회
        </button>
        <button
          className={`w-full p-4 ${
            selectedTab === "addItem" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedTab("addItem")}
        >
          상품 등록
        </button>
      </div>

      {/* ✅ 사이드바 하단에 로그아웃 버튼 추가 */}
      <button className="w-full bg-red-500 p-4 mt-auto" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
