"use client"

import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {components} from "@/lib/api/schema";
import {Button} from "@/components/ui/button";
import {MouseEventHandler} from "react";
import {client} from "@/app/api/client";
import {useRouter} from "next/navigation";


const formSchema = z.object({
    email: z.string().email({message: "유효한 이메일을 입력하세요."}),
    address: z.string().min(5, {message: "주소는 최소 5자 이상 입력해야 합니다."})
});


type OrderInfo = components["schemas"]["OrderInfoDto"];
const ClientOrdersPage = ({orderInfo}: { orderInfo: OrderInfo }) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            address: ""
        }
    });


    const handleCancelOrder: MouseEventHandler<HTMLButtonElement> | undefined = async () => {
        try {
            await client.DELETE("/v1/orders/{orderId}", {
                headers: {
                    memberPassword: "password0",
                },
            })
            router.push("/");
        } catch {
            alert("서버 오류");
        }
    };

    return (
        <div className="flex flex-col gap-2 w-1/2 mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>상품명</TableHead>
                        <TableHead className={"text-right"}>수량</TableHead>
                        <TableHead className="text-right">가격</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderInfo.orderItems!.map((orderItem) => (
                        <TableRow key={orderItem.itemId}>
                            <TableCell className="font-medium">{orderItem.itemName}</TableCell>
                            <TableCell className={"text-right"}>{orderItem.quantity}</TableCell>
                            <TableCell className="text-right">{orderItem.quantity! * orderItem.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">
                            {orderInfo.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}
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
                                <Input type="email" value={form.getValues("email")} readOnly
                                       className="border-none bg-transparent focus:ring-0"/>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">주소</TableCell>
                            <TableCell>
                                <Input type="text" value={form.getValues("address")} readOnly
                                       className="border-none bg-transparent focus:ring-0"/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {orderInfo.orderStatus === "ORDERED" && <div className="flex justify-center mt-5">
                    <Button type="button" className="w-1/2" variant="destructive" onClick={handleCancelOrder}>
                        주문 취소
                    </Button>
                </div>}
            </div>
        </div>
    )

}

export default ClientOrdersPage;
