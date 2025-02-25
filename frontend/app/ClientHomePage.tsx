"use client";

import {useCallback, useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {components} from "@/lib/api/schema";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import { CartItem } from "@/type/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import {CartItem} from "@/type/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import Image from "next/image";

type ItemDto = components["schemas"]["ItemDto"];
const HomeClientPage = ({ itemList }: { itemList: ItemDto[] }) => {
  const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);

const HomeClientPage = ({itemList, categoryList}: {
    itemList: ItemDto[];
    categoryList: { categoryId: number; categoryName: string }[]
}) => {
    const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openSheet, setOpenSheet] = useState<boolean>(false);
    const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredItemList, setFilteredItemList] = useState<ItemDto[]>(itemList);

  const getCart = useCallback(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
  }, []);

  const addToCart = (product: CartItem): void => {
    if (quantity < 1) {
      alert("1개 이상 주문해야합니다.");
      return;
    }
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const addToCart = (product: CartItem): void => {
        if (quantity < 1) {
            alert("1개 이상 주문해야 합니다.");
            return;
        }
        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find((item) => item.itemId === product.itemId);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItemList(getCart());
        setOpenDialog(false);
    };

    const deleteFromCart = (itemId: number): void => {
        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cart.filter((item) => item.itemId !== itemId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItemList(updatedCart);
    };

    useEffect(() => {
        setCartItemList(getCart());
    }, [getCart]);

    useEffect(() => {
        if (categoryList.length > 0) {
            setSelectedCategory(categoryList[0].categoryName);
        }
    }, [categoryList]);

    useEffect(() => {
        if (!selectedCategory) {
            setFilteredItemList(itemList);
        } else {
            setFilteredItemList(itemList.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory, itemList]);



    return (
        <div className="p-4">
            <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="카테고리 선택"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>카테고리</SelectLabel>
                        {categoryList.map(category => (
                            <SelectItem key={category.categoryId} value={category.categoryName}>
                                {category.categoryName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItemList.map((item) => (
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
                                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + '/' + item.imageUrl}
                                       alt={"item-image"}/>
                            </CardContent>
                        </CardContent>
                        <CardFooter>
                            <CardDescription>{item.description}</CardDescription>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={openDialog} onOpenChange={(isOpen) => {
                setOpenDialog(isOpen);
                if (!isOpen) setQuantity(1);
            }}>
                <DialogContent className="max-w-md p-6">
                    <DialogTitle>{selectedItem?.itemName ?? "Item Title"}</DialogTitle>
                    <DialogDescription>{selectedItem?.description ?? "Item Description"}</DialogDescription>
                    <DialogFooter>
                        <Input
                            name={"quantity"}
                            type={"number"}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            value={quantity}
                        />
                        <Button type={"submit"} variant={"outline"} onClick={() => addToCart({
                            itemId: selectedItem!.itemId,
                            itemName: selectedItem!.itemName,
                            quantity: quantity,
                            price: selectedItem!.price * quantity,
                        })}>추가</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className={"rounded-full w-14 h-14 fixed bottom-20 right-5"}
                            onClick={() => setOpenSheet(!openSheet)} variant={"outline"}>
                        <FontAwesomeIcon icon={cartItemList.length > 0 ? faCartPlus : faCartShopping}/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>장바구니</SheetTitle>
                    </SheetHeader>
                    <div className="mt-5 flex flex-col gap-2">
                        {cartItemList.length > 0 ? (
                            cartItemList.map((item) => (
                                <div key={item.itemId} className="grid grid-cols-4 items-center gap-4 w-full">
                                    <p>{item.itemName}</p>
                                    <p>{item.quantity}개</p>
                                    <p>{item.price * item.quantity}원</p>
                                    <Button variant="destructive" onClick={() => deleteFromCart(item.itemId)}>
                                        삭제
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
                        )}
                    </div>
                    <div className={"flex justify-between mt-5"}>
                        {cartItemList.length > 0 && (
                            <div className="grid grid-cols-4 items-center gap-4 w-full">
                                <div></div>
                                <div></div>
                                <p>{cartItemList.reduce((sum, item) => sum + item.quantity * item.price, 0)} 원</p>
                                <Link href={"/checkout"}>
                                    <Button className={"w-full"} type={"submit"}>주문</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default HomeClientPage;