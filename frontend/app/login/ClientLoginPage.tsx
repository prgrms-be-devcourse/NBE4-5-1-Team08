'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email({message: "유효한 이메일을 입력하세요."}),
    password: z.string().min(6, {message: "비밀번호는 최소 6자 이상이어야 합니다."}),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ClientLoginPage = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // TODO not made yet
    const onSubmit = async (values: FormSchemaType) => {
        const token = jwt.sign({username, role: "admin"}, JWT_SECRET, {expiresIn: "1h"});

        // 응답 쿠키에 JWT 저장
        const response = NextResponse.json({success: true, message: "로그인 성공"});
        response.cookies.set("token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production"});

        return response;
    }

    return (
        <div className="mt-6 p-6 border rounded-lg shadow-md w-1/2 mx-auto">
            <h2 className="text-xl font-bold mb-4">비회원 정보 입력</h2>
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

                    <div className={"flex justify-center mt-5"}>
                        <Button type="submit" className="w-full">로그인</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default ClientLoginPage;
