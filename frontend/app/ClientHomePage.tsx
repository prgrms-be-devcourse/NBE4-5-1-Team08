'use client';

import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {components} from "@/lib/api/schema";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";


type ItemDto = components["schemas"]["ItemDto"];
const HomeClientPage = ({itemList}: { itemList: ItemDto[] }) => {
    const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openSheet, setOpenSheet] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    type CartItem = {
        itemId: number;
        itemName: string;
        quantity: number;
        price: number;
    };

    const getCart = () => {
        return JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    }

    const addToCart = (product: CartItem): void => {
        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find((item) => item.itemId === product.itemId);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(getCart());
        setOpenDialog(false);
    };

    const deleteFromCart = (itemId: number): void => {
        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const updatedCart = cart.filter((item) => item.itemId !== itemId);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };


    return (
        <div className="p-4">
            <div className="mb-4">category</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {itemList.map((item) => (
                        <Card
                            key={item.itemId}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => {
                                setSelectedItem(item);
                                setOpenDialog(true);
                            }}
                        >
                            <CardHeader>
                                <CardTitle>{item.itemName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardContent>
                                    <p>사진 들어갈 공간</p>
                                </CardContent>
                            </CardContent>
                            <CardFooter>
                                <CardDescription>{item.description}</CardDescription>
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>

            {/*dialog area*/}
            <Dialog open={openDialog} onOpenChange={(isOpen) => {
                setOpenDialog(isOpen);
                if (!isOpen) setQuantity(1);
            }}>
                <DialogContent className="max-w-md p-6">
                    <DialogTitle>{selectedItem?.itemName ?? "Item Title"}</DialogTitle>
                    <DialogDescription>{selectedItem?.description ?? "Item Description"}</DialogDescription>
                    <DialogFooter>
                        <Input name={"quantity"} type={"number"} onChange={(e) => setQuantity(Number(e.target.value))}
                               value={quantity}></Input>
                        <Button type={"submit"} variant={"outline"} onClick={() => addToCart({
                            itemId: selectedItem!.itemId,
                            itemName: selectedItem!.itemName,
                            quantity: quantity,
                            price: selectedItem!.price * quantity,
                        })}>추가</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/*sheet area*/}
            <Sheet>
                <SheetTrigger asChild>
                    <Button onClick={() => setOpenSheet(!openSheet)} variant={"outline"}>장바구니</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>장바구니</SheetTitle>
                    </SheetHeader>
                    <div className="mt-5 flex flex-col gap-2">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.itemId} className="grid grid-cols-4 items-center gap-4">
                                    <p>{item.itemName}</p>
                                    <p>{item.quantity}개</p>
                                    <p>{item.price * item.quantity}원</p>
                                    <Button variant="destructive" size="sm" onClick={() => deleteFromCart(item.itemId)}>
                                        삭제
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
                        )}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            {cartItems.length > 0 && <Button type={"submit"} variant={"outline"}>주문</Button>}
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default HomeClientPage;