"use client"

import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CartItem, OrderPayload} from "@/type/types";
import {useRouter} from "next/navigation";
import {client} from "@/app/api/client";

const formSchema = z.object({
    email: z.string().email({message: "유효한 이메일을 입력하세요."}),
    password: z.string().min(4, {message: "비밀번호는 최소 4자 이상이어야 합니다."}),
    confirmPassword: z.string(),
    address: z.string().min(5, {message: "주소는 최소 5자 이상 입력해야 합니다."})
}).refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"]
});

type FormSchemaType = z.infer<typeof formSchema>;

const ClientCheckoutPage = () => {
    const cartItems: CartItem[] | null = JSON.parse(localStorage.getItem("cart") || "[]");
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            address: ""
        }
    });


    const onSubmit = async (values: FormSchemaType) => {
        if (!cartItems || cartItems.length === 0) {
            alert("장바구니가 비어 있습니다.");
            router.push("/");
            return;
        }

        const payload: OrderPayload = {
            itemList: cartItems.map(({itemId, quantity}) => ({itemId, quantity})),
            memberEmail: values.email,
            memberPassword: values.password,
            memberAddress: values.address
        };

        try {
            await client.POST('/v1/orders', {
                body: payload,
            });
        } catch (error) {
            console.error("주문 요청 중 오류 발생:", error);
        }
        localStorage.removeItem("cart");
        router.push("/");
    };

    return (
        <>
            {cartItems && (
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
                            {cartItems.map((cartItem) => (
                                <TableRow key={cartItem.itemId}>
                                    <TableCell className="font-medium">{cartItem.itemName}</TableCell>
                                    <TableCell className={"text-right"}>{cartItem.quantity}</TableCell>
                                    <TableCell className="text-right">{cartItem.quantity * cartItem.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell className="text-right">
                                    {cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <div className="mt-6 p-6 border rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">배송 정보 입력</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                <FormField control={form.control} name="email" render={({field}) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormLabel className="w-24">이메일</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="이메일을 입력하세요" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                                <FormField control={form.control} name="password" render={({field}) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormLabel className="w-24">비밀번호</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                                <FormField control={form.control} name="confirmPassword" render={({field}) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormLabel className="w-24">비밀번호 확인</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="비밀번호를 다시 입력하세요" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                                <FormField control={form.control} name="address" render={({field}) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormLabel className="w-24">주소</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="배송지를 입력하세요" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <div className={"flex justify-center mt-5"}>
                                    <Button type="submit" className="w-full">주문하기</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClientCheckoutPage;