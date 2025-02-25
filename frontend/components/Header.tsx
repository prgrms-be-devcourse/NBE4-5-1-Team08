"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const Header = () => {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
    };

    return (
        <header className="w-full bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>
                    <h1 className="text-xl font-bold">Grids & Circles</h1>
                </Link>
                {pathname.startsWith("/admin") ? (
                    <div>
                        <Button onClick={handleLogout} variant={"secondary"}>
                            로그아웃
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Link href={"/orders/lookup"} passHref>
                            <Button variant={"secondary"}>
                                주문조회
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;