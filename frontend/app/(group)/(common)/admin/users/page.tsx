// "use client";

// import React, { useState, useRef } from "react";
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
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Search,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   UserCheck,
//   UserX,
//   Mail,
//   RefreshCcw,
//   Users as UsersIcon,
//   Plus,
//   Download,
//   FileText,
//   Sheet,
//   Loader2,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { ROLE_OPTIONS } from "@/constants/constants";
// import { User } from "@/types/auth";
// import { getToken } from "@/services/http.service";
// import toast from "react-hot-toast";

// import { apiClient } from "@/utils/apiClient";

// // Clean schemas
// const baseUserSchema = z.object({
//   firstName: z.string().min(1, "First name is required").trim(),
//   lastName: z.string().min(1, "Last name is required").trim(),
//   email: z.string().email("Invalid email address").toLowerCase().trim(),
//   username: z.string().min(3, "Username must be at least 3 characters").trim(),
//   role: z.string().min(1, "Please select a role"),
// });

// const addUserSchema = baseUserSchema.extend({
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const editUserSchema = baseUserSchema.extend({
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .optional()
//     .or(z.literal("")),
// });

// type AddUserFormData = z.infer<typeof addUserSchema>;
// type EditUserFormData = z.infer<typeof editUserSchema>;
// type UserFormData = AddUserFormData | EditUserFormData;

// const Users = () => {
//   const [page, setPage] = useState<number>(1);
//   const [search, setSearch] = useState<string>("");
//   const [searchInput, setSearchInput] = useState<string>("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
// const [userToDelete, setUserToDelete] = useState<User | null>(null);
//   const pageSize = 10;
// const queryClient = useQueryClient();

//   // Dynamic form setup based on mode
//   const isEditMode = !!editingUser;
//   const form = useForm<UserFormData>({
//     resolver: zodResolver(isEditMode ? editUserSchema : addUserSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       username: "",
//       password: "",
//       role: "",
//     },
//   });

//   // // Use useEffect to populate form when editing user changes
//   // useEffect(() => {
//   //   if (editingUser && isDialogOpen) {
//   //     // Directly set form values without timeout
//   //     form.setValue("firstName", editingUser.firstName || "");
//   //     form.setValue("lastName", editingUser.lastName || "");
//   //     form.setValue("email", editingUser.email || "");
//   //     form.setValue("username", editingUser.username || "");
//   //     form.setValue("role", editingUser.role || "");
//   //     form.setValue("password", "");
//   //   }
//   // }, [editingUser, isDialogOpen, form]);

//   const { isPending, error, data, refetch } = useQuery({
//     queryKey: ["userData", page, search],
//     queryFn: async () => {
//       const token = await getToken();
//       const res = await fetch(
//         `http://localhost:8080/api/users/getAll?search=${search}&page=${page}&pageSize=${pageSize}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           method: "GET",
//         }
//       );
//       return res.json();
//     },
//   });

//   // API functions
//   // const createUser = async (userData: AddUserFormData): Promise<User> => {
//   //   const token = await getToken();
//   //   const response = await fetch("http://localhost:8080/api/users/create", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //     body: JSON.stringify(userData),
//   //   });
//   //   if (!response.ok) {
//   //     const error = await response.json();
//   //     throw new Error(error.message || "Failed to create user");
//   //   }
//   //   console.log("check response here", response);
//   //   toast.success("A user is created successfully");
//   //   return response.json();
//   // };

//   // const createUser = async (userData: AddUserFormData): Promise<User> => {
//   //   try {
//   //     const token = await getToken();
//   //     const response = await fetch("http://localhost:8080/api/users/create", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify(userData),
//   //     });

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       // Backend returned an error
//   //       throw new Error(data.message || "Failed to create user");
//   //     }

//   //     toast.success("A user is created successfully");
//   //     return data;
//   //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //   } catch (error: any) {
//   //     // Handle network errors or thrown backend errors
//   //     toast.error(error.message || "Something went wrong");
//   //     throw error; // re-throw if you want to handle it further upstream
//   //   }
//   // };

//   const createUser = async (userData: AddUserFormData): Promise<User> => {
//     try {
//       const data = await apiClient("http://localhost:8080/api/users/create", {
//         method: "POST",
//         body: JSON.stringify(userData),
//       });
//       toast.success("User created successfully");
//       return data;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(error.message);
//       throw error;
//     }
//   };

//   const updateUser = async ({
//     id,
//     userData,
//   }: {
//     id: string;
//     userData: Partial<EditUserFormData>;
//   }): Promise<User> => {
//     const token = await getToken();
//     const response = await fetch(
//       `http://localhost:8080/api/users/update/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(userData),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Failed to update user");
//     }
//     toast.success("A user updated successfully");
//     return response.json();
//   };

// const deleteUser = async (id: string): Promise<void> => {
//   const token = await getToken();
//   const response = await fetch(
//     `http://localhost:8080/api/users/delete/${id}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to delete user");
//   }
//   console.log("check user delete response here", response);
//   toast.success("A user deleted successfully");
// };

// // Mutations with loading states
// const createUserMutation = useMutation({
//   mutationFn: createUser,
//   onMutate: () => {
//     // Show loading state
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["userData"] });
//     handleDialogClose();
//     console.log("User created successfully");
//   },
//   onError: (error) => {
//     console.error("Error creating user:", error.message);
//   },
// });

// const updateUserMutation = useMutation({
//   mutationFn: updateUser,
//   onMutate: () => {
//     // Show loading state
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["userData"] });
//     handleDialogClose();
//     console.log("User updated successfully");
//   },
//   onError: (error) => {
//     console.error("Error updating user:", error.message);
//   },
// });

// const deleteUserMutation = useMutation({
//   mutationFn: deleteUser,
//   onMutate: () => {
//     // Show loading state
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["userData"] });
//     setDeleteAlertOpen(false);
//     setUserToDelete(null);
//     console.log("User deleted successfully");
//   },
//   onError: (error) => {
//     console.error("Error deleting user:", error.message);
//     setDeleteAlertOpen(false);
//     setUserToDelete(null);
//   },
// });

//   const handleSearch = () => {
//     setPage(1);
//     setSearch(searchInput);
//     refetch();
//   };

//   const debounceTimer = useRef<NodeJS.Timeout | null>(null);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimer.current) {
//         clearTimeout(debounceTimer.current);
//       }
//       debounceTimer.current = setTimeout(() => {
//         handleSearch();
//       }, 400);
//     }
//   };

//   const onSubmit = (data: UserFormData) => {
//     if (isEditMode) {
//       // Edit mode - remove password if it's empty
//       const updateData = { ...data };
//       if (!updateData.password || updateData.password === "") {
//         delete updateData.password;
//       }
//       updateUserMutation.mutate({
//         id: editingUser!.id,
//         userData: updateData,
//       });
//     } else {
//       // Add mode - password is required by schema
//       createUserMutation.mutate(data as AddUserFormData);
//     }
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//     setEditingUser(null);
//     setShowPassword(false);
//     form.reset({
//       firstName: "",
//       lastName: "",
//       email: "",
//       username: "",
//       password: "",
//       role: "",
//     });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (debounceTimer.current) clearTimeout(debounceTimer.current);
//     debounceTimer.current = setTimeout(() => {
//       setPage(1);
//       setSearch(value);
//       refetch();
//     }, 500);
//   };

//   const handleReset = () => {
//     setSearchInput("");
//     setSearch("");
//     setPage(1);
//     refetch();
//   };

//   // Action handlers
//   const handleView = (user: User) => {
//     console.log("View user:", user);
//     // Implement view logic
//   };

//   const handleEdit = (user: User) => {
//     console.log("Editing user:", user);
//     setEditingUser(user);
//     // setIsDialogOpen(true);
//     setIsEditDialogOpen(true);
//   };

// const handleDelete = (user: User) => {
//   console.log("Deleting user:", user);
//   setUserToDelete(user);
//   setDeleteAlertOpen(true);
// };

// const handleConfirmDelete = () => {
//   if (userToDelete) {
//     deleteUserMutation.mutate(userToDelete.id);
//   }
// };

//   const handleActivate = (user: User) => {
//     console.log("Activate user:", user);
//     // Implement activate logic
//   };

//   const handleDeactivate = (user: User) => {
//     console.log("Deactivate user:", user);
//     // Implement deactivate logic
//   };

//   const handleSendEmail = (user: User) => {
//     console.log("Send email to:", user);
//     // Implement send email logic
//   };

//   const handleAddUser = () => {
//     setEditingUser(null);
//     setIsDialogOpen(true);
//     // Form will be reset to default values automatically
//   };

//   const handleExportPDF = async () => {
//     try {
//       const token = await getToken();
//       const response = await fetch(
//         `http://localhost:8080/api/users/export/pdf?search=${search}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = `users-${new Date().toISOString().split("T")[0]}.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error("PDF export failed:", error);
//     }
//   };

//   const handleExportExcel = async () => {
//     try {
//       const token = await getToken();
//       const response = await fetch(
//         `http://localhost:8080/api/users/export/excel?search=${search}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = `users-${new Date().toISOString().split("T")[0]}.xlsx`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error("Excel export failed:", error);
//     }
//   };

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

//   if (isPending) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="flex items-center space-x-2">
//             <RefreshCcw className="h-6 w-6 animate-spin" />
//             <span className="text-lg">Loading users...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <Card className="border-red-200">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2 text-red-600">
//               <Trash2 className="h-5 w-5" />
//               <span>An error has occurred: {error.message}</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const columns = [
//     "Username",
//     "Email",
//     "Display Name",
//     "Role",
//     "Created At",
//     "Actions",
//   ];

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {/* Breadcrumbs */}
//       <Breadcrumb>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/admin">Administration</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Users</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-primary/10 rounded-lg">
//             <UsersIcon className="h-6 w-6 text-primary" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">
//               User Management
//             </h1>
//             <p className="text-muted-foreground">
//               Manage and monitor all system users
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Badge variant="outline" className="text-sm">
//             Total: {data?.meta?.total || 0} users
//           </Badge>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="sm">
//                 <Download className="h-4 w-4 mr-2" />
//                 Export
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuLabel>Export Options</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={handleExportPDF}
//                 className="cursor-pointer"
//               >
//                 <FileText className="mr-2 h-4 w-4" />
//                 Export as PDF
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={handleExportExcel}
//                 className="cursor-pointer"
//               >
//                 <Sheet className="mr-2 h-4 w-4" />
//                 Export as Excel
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Button onClick={handleAddUser} size="sm">
//             <Plus className="h-4 w-4 mr-2" />
//             Add User
//           </Button>
//         </div>
//       </div>

//       {/* Search and Filters Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Search & Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by email or username..."
//                 value={searchInput}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 className="pl-10"
//               />
//             </div>
//             <Button onClick={handleSearch} className="shrink-0">
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//             <Button
//               variant="outline"
//               onClick={handleReset}
//               className="shrink-0"
//             >
//               <RefreshCcw className="h-4 w-4 mr-2" />
//               Clear
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Users List</CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow className="hover:bg-transparent">
//                 {columns.map((column, index) => (
//                   <TableHead key={index} className="font-semibold">
//                     {column}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data?.users && data.users.length > 0 ? (
//                 data.users.map((user: User) => (
//                   <TableRow key={user.id} className="hover:bg-muted/50">
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.displayName}</TableCell>
//                     <TableCell>
//                       <Badge variant={getRoleBadgeVariant(user.role)}>
//                         {user.role}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-sm text-muted-foreground">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })
//                         : "-"}
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-48">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleView(user)}
//                             className="cursor-pointer"
//                           >
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleEdit(user)}
//                             className="cursor-pointer"
//                           >
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleSendEmail(user)}
//                             className="cursor-pointer"
//                           >
//                             <Mail className="mr-2 h-4 w-4" />
//                             Send Email
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleActivate(user)}
//                             className="cursor-pointer text-green-600"
//                           >
//                             <UserCheck className="mr-2 h-4 w-4" />
//                             Activate
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDeactivate(user)}
//                             className="cursor-pointer text-orange-600"
//                           >
//                             <UserX className="mr-2 h-4 w-4" />
//                             Deactivate
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleDelete(user)}
//                             className="cursor-pointer text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="text-center py-12"
//                   >
//                     <div className="flex flex-col items-center space-y-3">
//                       <UsersIcon className="h-12 w-12 text-muted-foreground/50" />
//                       <div className="text-lg font-medium text-muted-foreground">
//                         {data ? "No users found" : "Unable to load users"}
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         {search
//                           ? "Try adjusting your search criteria"
//                           : "No users have been created yet"}
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Pagination */}
//       {data?.users?.length > 0 && (
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Showing {(page - 1) * pageSize + 1} to{" "}
//             {Math.min(page * pageSize, data?.meta?.total || 0)} of{" "}
//             {data?.meta?.total || 0} results
//           </div>
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (page > 1) setPage((prev) => prev - 1);
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
//                       setPage(i + 1);
//                     }}
//                     className="cursor-pointer"
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
//                       setPage((prev) => prev + 1);
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

//       {/* Add User Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent
//           // onInteractOutside={(e) => e.preventDefault()}
//           className="sm:max-w-[600px]"
//         >
//           <DialogHeader>
//             <DialogTitle>
//               {isEditMode ? "Edit User" : "Add New User"}
//             </DialogTitle>
//             <DialogDescription>
//               {isEditMode
//                 ? "Update the user information below."
//                 : "Fill in the details to create a new user account."}
//             </DialogDescription>
//           </DialogHeader>
//           <Form key={isEditMode ? "edit" : "add"} {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Doe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="user@example.com"
//                           type="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="username" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value || ""}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select a role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {ROLE_OPTIONS.map((role) => (
//                             <SelectItem key={role.value} value={role.value}>
//                               {role.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Password{" "}
//                         {isEditMode && (
//                           <span className="text-sm text-muted-foreground">
//                             (leave empty to keep current)
//                           </span>
//                         )}
//                       </FormLabel>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder={
//                               isEditMode
//                                 ? "Leave empty to keep current"
//                                 : "Enter password"
//                             }
//                             {...field}
//                           />
//                         </FormControl>
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <DialogFooter>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleDialogClose}
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => form.reset()}
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   Clear
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   {createUserMutation.isPending ||
//                   updateUserMutation.isPending ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       {isEditMode ? "Updating..." : "Creating..."}
//                     </>
//                   ) : (
//                     <>{isEditMode ? "Update User" : "Create User"}</>
//                   )}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>

//       {/* Add User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent
//           // onInteractOutside={(e) => e.preventDefault()}
//           className="sm:max-w-[600px]"
//         >
//           <DialogHeader>
//             <DialogTitle>
//               {isEditMode ? "Edit User" : "Add New User"}
//             </DialogTitle>
//             <DialogDescription>
//               {isEditMode
//                 ? "Update the user information below."
//                 : "Fill in the details to create a new user account."}
//             </DialogDescription>
//           </DialogHeader>
//           <Form key={isEditMode ? "edit" : "add"} {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Doe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="user@example.com"
//                           type="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="username" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value || ""}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select a role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {ROLE_OPTIONS.map((role) => (
//                             <SelectItem key={role.value} value={role.value}>
//                               {role.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Password{" "}
//                         {isEditMode && (
//                           <span className="text-sm text-muted-foreground">
//                             (leave empty to keep current)
//                           </span>
//                         )}
//                       </FormLabel>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder={
//                               isEditMode
//                                 ? "Leave empty to keep current"
//                                 : "Enter password"
//                             }
//                             {...field}
//                           />
//                         </FormControl>
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <DialogFooter>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleDialogClose}
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => form.reset()}
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   Clear
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={
//                     createUserMutation.isPending || updateUserMutation.isPending
//                   }
//                 >
//                   {createUserMutation.isPending ||
//                   updateUserMutation.isPending ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       {isEditMode ? "Updating..." : "Creating..."}
//                     </>
//                   ) : (
//                     <>{isEditMode ? "Update User" : "Create User"}</>
//                   )}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>

// {/* Delete Confirmation Alert Dialog */}
// <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
// <AlertDialogContent>
//   <AlertDialogHeader>
//     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//     <AlertDialogDescription>
//       This action cannot be undone. This will permanently delete the
//       user account for <strong>{userToDelete?.username}</strong> and
//       remove all associated data from our servers.
//     </AlertDialogDescription>
//   </AlertDialogHeader>
//   <AlertDialogFooter>
//     <AlertDialogCancel
//       onClick={() => {
//         setDeleteAlertOpen(false);
//         setUserToDelete(null);
//       }}
//     >
//       Cancel
//     </AlertDialogCancel>
//     <AlertDialogAction
//       onClick={handleConfirmDelete}
//       disabled={deleteUserMutation.isPending}
//       className="bg-red-600 hover:bg-red-700"
//     >
// {deleteUserMutation.isPending ? (
//   <>
//     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//     Deleting...
//   </>
// ) : (
//   "Delete User"
// )}
//     </AlertDialogAction>
//   </AlertDialogFooter>
// </AlertDialogContent>
// </AlertDialog>
//     </div>
//   );
// };

// export default Users;

// "use client";

// import React, { useRef, useState } from "react";

// import {
//   Download,
//   FileText,
//   Plus,
//   RefreshCcw,
//   Search,
//   Sheet,
//   UsersIcon,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { getToken } from "@/services/http.service";
// import { useQuery } from "@tanstack/react-query";
// import { BreadcrumbWithCustomSeparator } from "./BreadCrumbs";
// import { TableComponent } from "./Table";
// import { AddUserDialog } from "./AddUserDialog";
// import { EditUserDialog } from "./EditUserDialog";
// import { User } from "@/types/auth";
// // import { User } from "@/types/auth";

// const Users = () => {
//   const [page, setPage] = useState<number>(1);
//   const [pageSize, setPageSize] = useState<number>(10); // ✅ dynamic page size

//   const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
//   const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const [search, setSearch] = useState<string>("");
//   const [searchInput, setSearchInput] = useState<string>("");
//   const debounceTimer = useRef<NodeJS.Timeout | null>(null);

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["userData", page, pageSize, search],
//     queryFn: async () => {
//       const token = await getToken();
//       const res = await fetch(
//         `http://localhost:8080/api/users/getAll?search=${search}&page=${page}&pageSize=${pageSize}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           method: "GET",
//         }
//       );
//       return res.json();
//     },
//   });

//   const handleAddUser = () => {
//     setIsAddOpen(true);
//   };

//   const handleEditUser = (user: User) => {
//     setSelectedUser(user);
//     setIsEditOpen(true);
//   };

//   const handleCloseEdit = () => {
//     setIsEditOpen(false);
//     setSelectedUser(null);
//   };

//   const handleReset = () => {
//     setSearchInput("");
//     setSearch("");
//     setPage(1);
//     setPageSize(10);
//     refetch();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (debounceTimer.current) clearTimeout(debounceTimer.current);
//     debounceTimer.current = setTimeout(() => {
//       setPage(1);
//       setSearch(value);
//       refetch();
//     }, 500);
//   };

//   const handleSearch = () => {
//     setPage(1);
//     setSearch(searchInput);
//     refetch();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimer.current) {
//         clearTimeout(debounceTimer.current);
//       }
//       debounceTimer.current = setTimeout(() => {
//         handleSearch();
//       }, 400);
//     }
//   };

//   if (isLoading) return <p>Loading..</p>;

//   return (
//     <div>
//       <div className="mb-2">
//         <BreadcrumbWithCustomSeparator />
//       </div>

// {/* Header */}
// <div className="flex items-center justify-between mb-4">
//   <div className="flex items-center space-x-3">
//     <div className="p-2 bg-primary/10 rounded-lg">
//       <UsersIcon className="h-6 w-6 text-primary" />
//     </div>
//     <div>
//       <h1 className="text-2xl font-bold tracking-tight">
//         User Management
//       </h1>
//       <p className="text-muted-foreground">
//         Manage and monitor all system users
//       </p>
//     </div>
//   </div>
//   <div className="flex items-center space-x-3">
//     <Badge variant="outline" className="text-sm">
//       Total: {data?.meta?.total || 0} users
//     </Badge>
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm">
//           <Download className="h-4 w-4 mr-2" />
//           Export
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-48">
//         <DropdownMenuLabel>Export Options</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           // onClick={handleExportPDF}
//           className="cursor-pointer"
//         >
//           <FileText className="mr-2 h-4 w-4" />
//           Export as PDF
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           // onClick={handleExportExcel}
//           className="cursor-pointer"
//         >
//           <Sheet className="mr-2 h-4 w-4" />
//           Export as Excel
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//     <Button onClick={handleAddUser} size="sm">
//       <Plus className="h-4 w-4 mr-2" />
//       Add User
//     </Button>
//   </div>
// </div>

//       {/* Search and Filters Card */}
//       <Card className="mb-4">
//         <CardHeader>
//           <CardTitle className="text-lg">Search & Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by email, username or role..."
//                 value={searchInput}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 className="pl-10"
//               />
//             </div>
//             <Button onClick={handleSearch} className="shrink-0">
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//             <Button
//               variant="outline"
//               onClick={handleReset}
//               className="shrink-0"
//             >
//               <RefreshCcw className="h-4 w-4 mr-2" />
//               Clear
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/*Users table*/}

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Users List</CardTitle>
//           {/* ✅ Page size selector */}

//           <div className="flex items-center gap-2">
//             {" "}
//             <span className="text-sm text-muted-foreground">
//               Rows per page:
//             </span>
//             <Select
//               value={pageSize.toString()}
//               onValueChange={(val) => {
//                 setPageSize(Number(val));
//                 setPage(1);
//               }}
//             >
//               <SelectTrigger className="w-[100px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {[10, 25, 50, 100].map((size) => (
//                   <SelectItem key={size} value={size.toString()}>
//                     {size}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent className="p-1">
//           <TableComponent
//             data={data}
//             page={page}
//             pageSize={pageSize}
//             onPageChange={(newPage) => setPage(newPage)}
//             onEditUser={handleEditUser}
//           />
//         </CardContent>
//       </Card>
//       <AddUserDialog
//         isOpen={isAddOpen}
//         onClose={() => setIsAddOpen(false)}
//         onUserCreated={() => refetch()} // refresh users table after adding
//       />

//       {/* Edit User Dialog */}
//       {selectedUser && (
//         <EditUserDialog
//           isOpen={isEditOpen}
//           // onClose={() => setIsEditOpen(false)}
//           onClose={handleCloseEdit}
//           user={selectedUser}
//           onUserUpdated={() => refetch()}
//         />
//       )}
//     </div>
//   );
// };

// export default Users;

"use client";

import React, { useRef, useState } from "react";

import {
  Download,
  FileText,
  Loader2,
  Plus,
  RefreshCcw,
  Search,
  Sheet,
  UsersIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getToken } from "@/services/http.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BreadcrumbWithCustomSeparator } from "./BreadCrumbs";
import { TableComponent } from "./Table";
import { AddUserDialog } from "./AddUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { User } from "@/types/auth";
import toast from "react-hot-toast";
import { ViewUserDialog } from "./ViewUserDialog";

const Users = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToView, setUserToView] = useState<User | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userData", page, pageSize, search],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(
        `http://localhost:8080/api/users/getAll?search=${search}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      return res.json();
    },
  });

  const deleteUser = async (id: string): Promise<void> => {
    const token = await getToken();
    const response = await fetch(
      `http://localhost:8080/api/users/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete user");
    }
    console.log("check user delete response here", response);
    toast.success("A user deleted successfully");
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: () => {
      // Show loading state
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setIsDeleteOpen(false);
      setUserToDelete(null);
      console.log("User deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user:", error.message);
      setIsDeleteOpen(false);
      setUserToDelete(null);
    },
  });

  const handleAddUser = () => {
    setIsAddOpen(true);
  };

  const handleEditUser = (user: User) => {
    console.log("handleEditUser called with user:", user); // Debug log

    // Ensure we have a complete user object with all required fields
    const completeUser: User = {
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
      // Add any other properties that might be missing
    };

    setSelectedUser(completeUser);
    setIsEditOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setIsDeleteOpen(true);

    console.log("Deleting user:", user);
    setUserToDelete(user);
  };

  const handleCloseEdit = () => {
    console.log("handleCloseEdit called"); // Debug log
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleViewUser = (user: User) => {
    setIsViewOpen(true);
    setUserToView(user);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
    setPageSize(10);
    refetch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setSearch(value);
      refetch();
    }, 500);
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        handleSearch();
      }, 400);
    }
  };

  const handleUserUpdated = () => {
    console.log("handleUserUpdated called"); // Debug log
    refetch();
    handleCloseEdit(); // Close the dialog after successful update
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id);
    }
  };

  if (isLoading) return <p>Loading..</p>;

  return (
    <div>
      <div className="mb-2">
        <BreadcrumbWithCustomSeparator />
      </div>

      {/* Header */}
      {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UsersIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all system users
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            Total: {data?.meta?.total || 0} users
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={handleExportPDF}
                className="cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                // onClick={handleExportExcel}
                className="cursor-pointer"
              >
                <Sheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAddUser} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div> */}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UsersIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all system users
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            Total: {data?.meta?.total || 0} users
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={handleExportPDF}
                className="cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                // onClick={handleExportExcel}
                className="cursor-pointer"
              >
                <Sheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAddUser} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by email, username or role..."
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="shrink-0"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/*Users table*/}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Users List</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-1">
          <TableComponent
            data={data}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onViewUser={handleViewUser}
          />
        </CardContent>
      </Card>

      {isAddOpen && (
        <AddUserDialog
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onUserCreated={() => refetch()}
        />
      )}

      {/* Edit User Dialog - Only render when we have a selected user */}
      {selectedUser && isEditOpen && (
        <EditUserDialog
          key={selectedUser.id}
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {userToView && isViewOpen && (
        <ViewUserDialog
          key={userToView.id}
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          user={userToView}
        />
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for <strong>{userToDelete?.username}</strong> and
              remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteUserMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;
