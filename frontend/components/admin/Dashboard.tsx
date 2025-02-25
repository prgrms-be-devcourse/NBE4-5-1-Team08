"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Content from "@/components/admin/Content";
import ItemForm from "@/components/admin/ItemForm";

const Dashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<
    "items" | "sales" | "addItem" | "editItem"
  >("items");
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/admin/me");
        const data = await response.json();
        if (!data.authenticated) {
          router.replace("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex w-full h-screen bg-gray-900 text-white">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex flex-col flex-grow p-6 h-full">
        {selectedTab === "addItem" ? (
          <div className="flex justify-center items-center h-full">
            <ItemForm isEditMode={false} setSelectedTab={setSelectedTab} />
          </div>
        ) : selectedTab === "editItem" && editItemId ? (
          <div className="flex justify-center items-center h-full">
            <ItemForm
              isEditMode={true}
              itemId={editItemId}
              setSelectedTab={setSelectedTab}
            />
          </div>
        ) : (
          <Content
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setEditItemId={setEditItemId} // 수정 기능 추가
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
