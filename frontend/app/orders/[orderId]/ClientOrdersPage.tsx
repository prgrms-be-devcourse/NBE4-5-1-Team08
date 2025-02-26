"use client";

import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {components} from "@/lib/api/schema";
import {Button} from "@/components/ui/button";
import {useParams, useRouter} from "next/navigation";


type OrderInfo = components["schemas"]["OrderInfoDto"];

const ClientOrdersPage = () => {
    const router = useRouter();
    const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
    const {orderId} = useParams();

    useEffect(() => {
        if (!orderId) return;
        const fetchOrderInfo = async () => {
            const storedPassword = sessionStorage.getItem("orderPassword");

            if (!storedPassword) {
                alert("비밀번호 정보가 없습니다. 다시 로그인해주세요.");
                router.push("/orders/lookup");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/orders/${orderId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "memberPassword": storedPassword,
                    },
                });

                if (!response.ok) {
                    throw new Error("데이터 로드 실패");
                }

                const rsData = await response.json();

                if (!rsData?.success || !rsData.data) {
                    throw new Error("데이터 로드 실패");
                }

                setOrderInfo(rsData.data);
                sessionStorage.setItem("orderInfo", JSON.stringify(rsData.data));

            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchOrderInfo();
    }, []);

    return (
        <div className="flex flex-col gap-2 w-1/2 mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>상품명</TableHead>
                        <TableHead className="text-right">수량</TableHead>
                        <TableHead className="text-right">가격</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderInfo?.orderItems?.map((orderItem) => (
                        <TableRow key={orderItem.itemId}>
                            <TableCell className="font-medium">{orderItem.itemName}</TableCell>
                            <TableCell className="text-right">{orderItem.quantity}</TableCell>
                            <TableCell className="text-right">{orderItem.quantity! * orderItem.price!}</TableCell>
                        </TableRow>
                    )) || (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">주문 정보를 불러오는 중...</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">
                            {orderInfo?.orderItems?.reduce((sum, item) => sum + item.quantity! * item.price!, 0) || 0}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <div className="mt-6 p-6 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">배송 정보 입력</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-32">항목</TableHead>
                            <TableHead>입력값</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">이메일</TableCell>
                            <TableCell>
                                <Input type="email" value={orderInfo?.memberEmail || ""} readOnly
                                       className="border-none bg-transparent focus:ring-0"/>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">주소</TableCell>
                            <TableCell>
                                <Input type="text" value={orderInfo?.memberAddress || ""} readOnly
                                       className="border-none bg-transparent focus:ring-0"/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {orderInfo?.orderStatus === "ORDERED" && (
                    <div className="flex justify-center mt-5">
                        <Button onClick={() => {
                            sessionStorage.removeItem("orderInfo");
                            sessionStorage.removeItem("orderPassword");
                            router.push("/orders/lookup");
                        }}>
                            다른 주문 조회
                        </Button>
                        <Button type="button" className="w-1/2" variant="destructive" onClick={async () => {
                            try {
                                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/orders/${orderId}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "memberPassword": sessionStorage.getItem("orderPassword") || "",
                                    },
                                });
                                router.push("/");
                            } catch {
                                alert("서버 오류");
                            }
                        }}>
                            주문 취소
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientOrdersPage;