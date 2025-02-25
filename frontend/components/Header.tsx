"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Grids & Circles</h1>
        </Link>
        {!isAdminPage && (
          <div className="flex gap-4">
            <Link href="/orders/lookup">
              <Button variant="secondary">주문조회</Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="secondary">관리자 로그인</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
