// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// export function TableComponent({
//   data,
//   page,
//   pageSize,
//   onPageChange,
// }: {
//   data: any;
//   page: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
// }) {
//   const getRoleBadgeVariant = (role: string) => {
//     switch (role?.toLowerCase()) {
//       case "admin":
//         return "destructive";
//       case "user":
//         return "default";
//       case "moderator":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   console.log("check data i2i2", data);
//   return (
//     <>
//       <Table>
//         {/* <TableCaption>A list of users.</TableCaption> */}
//         <TableHeader>
//           <TableRow>
//             <TableHead>Username</TableHead>
//             <TableHead>Display Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone</TableHead>
//             <TableHead>CreatedAt</TableHead>
//             <TableHead>UpdatedAt</TableHead>
//             <TableHead>tenantId</TableHead>
//             <TableHead>Role</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data?.users?.length > 0 ? (
//             data.users.map((user: any) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.displayName}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phone ?? "-"}</TableCell>
//                 <TableCell>{user.createdAt}</TableCell>
//                 <TableCell>{user.updatedAt}</TableCell>
//                 <TableCell>{user.tenantId ?? "-"}</TableCell>
//                 <TableCell>
//                   <Badge variant={getRoleBadgeVariant(user.role)}>
//                     {user.role}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={8} className="text-center py-4">
//                 No users found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       {/* Pagination */}

//       {data?.users?.length > 0 && (
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
//             <span>
//               Showing {(page - 1) * pageSize + 1} to{" "}
//               {Math.min(page * pageSize, data?.meta?.total || 0)} of{" "}
//               {data?.meta?.total || 0} results
//             </span>
//           </div>

//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (page > 1) onPageChange(page - 1);
//                   }}
//                   className={
//                     page === 1
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>

//               {Array.from({ length: data?.meta?.totalPages || 1 }, (_, i) => (
//                 <PaginationItem key={i}>
//                   <PaginationLink
//                     href="#"
//                     isActive={page === i + 1}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       onPageChange(i + 1);
//                     }}
//                   >
//                     {i + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (page < (data?.meta?.totalPages || 1)) {
//                       onPageChange(page + 1);
//                     }
//                   }}
//                   className={
//                     page === data?.meta?.totalPages
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Mail,
//   UserCheck,
//   UserX,
//   Trash2,
// } from "lucide-react";
// import { User } from "@/types/auth";

// export function TableComponent({
//   data,
//   page,
//   pageSize,
//   onPageChange,
//   onEditUser,
// }: {
//   data: any;
//   page: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
//   onEditUser: (user: User) => void;
// }) {
//   const getRoleBadgeVariant = (role: string) => {
//     switch (role?.toLowerCase()) {
//       case "admin":
//         return "destructive";
//       case "user":
//         return "default";
//       case "moderator":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   // 👉 placeholder handlers (you can wire real logic later)
//   const handleView = (user: any) => console.log("View", user);
//   const handleEdit = (user: any) => {
//     console.log("Edit", user);
//     onEditUser(user);
//   };
//   const handleSendEmail = (user: any) => console.log("Send Email", user);
//   const handleActivate = (user: any) => console.log("Activate", user);
//   const handleDeactivate = (user: any) => console.log("Deactivate", user);
//   const handleDelete = (user: any) => console.log("Delete", user);

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Username</TableHead>
//             <TableHead>Display Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone</TableHead>
//             <TableHead>CreatedAt</TableHead>
//             <TableHead>UpdatedAt</TableHead>
//             <TableHead>TenantId</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data?.users?.length > 0 ? (
//             data.users.map((user: any) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.displayName}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phone ?? "-"}</TableCell>
//                 <TableCell>{user.createdAt}</TableCell>
//                 <TableCell>{user.updatedAt}</TableCell>
//                 <TableCell>{user.tenantId ?? "-"}</TableCell>
//                 <TableCell>
//                   <Badge variant={getRoleBadgeVariant(user.role)}>
//                     {user.role}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-48">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => handleView(user)}
//                         className="cursor-pointer"
//                       >
//                         <Eye className="mr-2 h-4 w-4" />
//                         View Details
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleEdit(user)}
//                         className="cursor-pointer"
//                       >
//                         <Edit className="mr-2 h-4 w-4" />
//                         Edit User
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleSendEmail(user)}
//                         className="cursor-pointer"
//                       >
//                         <Mail className="mr-2 h-4 w-4" />
//                         Send Email
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => handleActivate(user)}
//                         className="cursor-pointer text-green-600"
//                       >
//                         <UserCheck className="mr-2 h-4 w-4" />
//                         Activate
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleDeactivate(user)}
//                         className="cursor-pointer text-orange-600"
//                       >
//                         <UserX className="mr-2 h-4 w-4" />
//                         Deactivate
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(user)}
//                         className="cursor-pointer text-red-600"
//                       >
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete User
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={9} className="text-center py-4">
//                 No users found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       {/* Pagination */}
//       {data?.users?.length > 0 && (
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
//             <span>
//               Showing {(page - 1) * pageSize + 1} to{" "}
//               {Math.min(page * pageSize, data?.meta?.total || 0)} of{" "}
//               {data?.meta?.total || 0} results
//             </span>
//           </div>

//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (page > 1) onPageChange(page - 1);
//                   }}
//                   className={
//                     page === 1
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>

//               {Array.from({ length: data?.meta?.totalPages || 1 }, (_, i) => (
//                 <PaginationItem key={i}>
//                   <PaginationLink
//                     href="#"
//                     isActive={page === i + 1}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       onPageChange(i + 1);
//                     }}
//                   >
//                     {i + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (page < (data?.meta?.totalPages || 1)) {
//                       onPageChange(page + 1);
//                     }
//                   }}
//                   className={
//                     page === data?.meta?.totalPages
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import {
//   // DropdownMenu,
//   // DropdownMenuContent,
//   // DropdownMenuItem,
//   // DropdownMenuLabel,
//   // DropdownMenuSeparator,
//   // DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  // MoreHorizontal,
  Eye,
  Edit,
  // Mail,
  // UserCheck,
  // UserX,
  Trash2,
} from "lucide-react";
import { User } from "@/types/auth";

export function TableComponent({
  data,
  page,
  pageSize,
  onPageChange,
  onEditUser,
  onDeleteUser,
  onViewUser,
}: {
  data: any;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onViewUser: (user: User) => void;
}) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "destructive";
      case "user":
        return "default";
      case "moderator":
        return "secondary";
      default:
        return "outline";
    }
  };

  // 👉 placeholder handlers (you can wire real logic later)
  const handleView = (user: User) => {
    console.log("View", user);
    onViewUser(user);
  };

  const handleEdit = (user: any) => {
    console.log("Edit button clicked for user:", user); // Debug log

    // Ensure we have all the required fields for the User type
    const userForEdit: User = {
      id: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      username: user.username || "",
      role: user.role || "",
      displayName: user.displayName || "",
      // phone: user.phone || "",
      createdAt: user.createdAt || "",
      // updatedAt: user.updatedAt || "",
      // tenantId: user.tenantId || null,
    };

    onEditUser(userForEdit);
  };

  // const handleSendEmail = (user: any) => console.log("Send Email", user);
  // const handleActivate = (user: any) => console.log("Activate", user);
  // const handleDeactivate = (user: any) => console.log("Deactivate", user);
  const handleDelete = (user: any) => {
    onDeleteUser(user);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Display Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>UpdatedAt</TableHead>
            <TableHead>TenantId</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>

            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users?.length > 0 ? (
            data.users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone ?? "-"}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.updatedAt}</TableCell>
                <TableCell>{user.tenantId ?? "-"}</TableCell>
                <TableCell>{user.status ?? "-"} </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                {/* <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleView(user);
                        }}
                        className="cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        // onClick={() => {
                        //   // e.preventDefault();
                        //   handleEdit(user);
                        // }}
                        onClick={() => handleEdit(user)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          // e.preventDefault();
                          handleSendEmail(user);
                        }}
                        className="cursor-pointer"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleActivate(user);
                        }}
                        className="cursor-pointer text-green-600"
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeactivate(user);
                        }}
                        className="cursor-pointer text-orange-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(user);
                        }}
                        className="cursor-pointer text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit User */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(user)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>

                    {/* Delete User */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(user)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                    {/* (Optional) View Details */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleView(user)}
                      title="View"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {data?.users?.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
            <span>
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, data?.meta?.total || 0)} of{" "}
              {data?.meta?.total || 0} results
            </span>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) onPageChange(page - 1);
                  }}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: data?.meta?.totalPages || 1 }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < (data?.meta?.totalPages || 1)) {
                      onPageChange(page + 1);
                    }
                  }}
                  className={
                    page === data?.meta?.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
