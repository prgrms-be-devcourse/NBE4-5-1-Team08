'use client';

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        setIsLogin(!!userToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setIsLogin(false);
    };

    return (
        <header className="w-full bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Grids & Circles</h1>
                {pathname.startsWith("/admin") && (
                    <div>
                        {isLogin ? (
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                                로그아웃
                            </button>
                        ) : (
                            <button onClick={() => (window.location.href = "/login")}
                                    className="bg-blue-500 px-4 py-2 rounded">
                                로그인
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;