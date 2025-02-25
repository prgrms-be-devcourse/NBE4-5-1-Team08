import { Button } from "@/components/ui/button";

type SidebarProps = {
  selectedTab: "items" | "sales";
  setSelectedTab: (tab: "items" | "sales") => void;
};

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  return (
    <div className="w-1/5 bg-gray-800 p-6 shadow-md flex flex-col">
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
      </div>
    </div>
  );
};

export default Sidebar;
