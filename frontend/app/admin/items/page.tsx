import Dashboard from "@/components/admin/Dashboard";

const AdminDashboard = () => {
  return <Dashboard />;
};

export default AdminDashboard;

// import client from "@/app/api/client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// const ItemListPage = async () => {
//   const rsData = await client.GET("/v1/items");

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <Link href={"/admin/items/new"}>
//           <Button className="bg-blue-500">상품 등록</Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {rsData?.data?.success ? (
//           rsData.data.data!.map((item) => (
//             <Link href={`/admin/items/${item.itemId}/edit`} key={item.itemId}>
//               <Card className="cursor-pointer hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <CardTitle>{item.itemName}</CardTitle>
//                   <CardDescription>{item.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Card Content</p>
//                 </CardContent>
//                 <CardFooter>
//                   <p>{item.stockQuantity}</p>
//                 </CardFooter>
//               </Card>
//             </Link>
//           ))
//         ) : (
//           <div>{rsData.data!.message}</div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ItemListPage;
