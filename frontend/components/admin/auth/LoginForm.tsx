"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "아이디 또는 비밀번호가 틀렸습니다.");
        return;
      }

      if (data.success) {
        router.push("/admin/items");
        router.refresh();
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setErrorMessage("서버와 연결할 수 없습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="adminId">아이디</Label>
                <Input
                  id="adminId"
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleChange}
                  placeholder="관리자 아이디 입력"
                  required
                />
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호 입력"
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="bg-blue-500 w-full">
              로그인
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
