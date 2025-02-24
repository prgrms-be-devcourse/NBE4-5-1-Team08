'use client';

import {usePathname} from "next/navigation";
import Link from "next/link";

const Header = () => {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
    };

    return (
        <header className="w-full bg-gray-900 text-white p-4 shadow-md">
            <Link href={"/"}>
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Grids & Circles</h1>
                    {pathname.startsWith("/admin") && (
                        <div>
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </Link>
        </header>
    );
};

export default Header;