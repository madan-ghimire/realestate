// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import toast from "react-hot-toast";
// import { ROLE_OPTIONS } from "@/constants/constants";
// import { apiClient } from "@/utils/apiClient";
// import { Loader2 } from "lucide-react";
// import { User } from "@/types/auth";

// // Zod schema for editing a user
// const editUserSchema = z.object({
//   firstName: z.string().min(1, "First name is required").trim(),
//   lastName: z.string().min(1, "Last name is required").trim(),
//   email: z.string().email("Invalid email").trim().toLowerCase(),
//   username: z.string().min(3, "Username must be at least 3 characters").trim(),
//   role: z.string().min(1, "Role is required"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .optional()
//     .or(z.literal("")),
// });

// export type EditUserFormData = z.infer<typeof editUserSchema>;

// interface EditUserDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: User;
//   onUserUpdated: () => void;
// }

// export const EditUserDialog: React.FC<EditUserDialogProps> = ({
//   isOpen,
//   onClose,
//   user,
//   onUserUpdated,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<EditUserFormData>({
//     resolver: zodResolver(editUserSchema),
//     defaultValues: {
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       username: user.username || "",
//       role: user.role || "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     form.reset({
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       username: user.username || "",
//       role: user.role || "",
//       password: "",
//     });
//   }, [user, form]);

//   const onSubmit = async (data: EditUserFormData) => {
//     try {
//       setIsLoading(true);
//       const updateData = { ...data };
//       if (!updateData.password || updateData.password === "")
//         delete updateData.password;

//       await apiClient(`http://localhost:8080/api/users/update/${user.id}`, {
//         method: "PUT",
//         body: JSON.stringify(updateData),
//       });

//       toast.success("User updated successfully");
//       onUserUpdated();
//       onClose();
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(error.message || "Failed to update user");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Edit User</DialogTitle>
//           <DialogDescription>
//             Update the user information below.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="role"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Role</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       value={field.value || ""}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select a role" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {ROLE_OPTIONS.map((r) => (
//                           <SelectItem key={r.value} value={r.value}>
//                             {r.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Password{" "}
//                       <span className="text-sm text-muted-foreground">
//                         (leave empty to keep current)
//                       </span>
//                     </FormLabel>
//                     <div className="relative">
//                       <FormControl>
//                         <Input
//                           type={showPassword ? "text" : "password"}
//                           {...field}
//                         />
//                       </FormControl>
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                       >
//                         {showPassword ? <span>Hide</span> : <span>Show</span>}
//                       </button>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onClose}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                 ) : (
//                   "Update User"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { ROLE_OPTIONS } from "@/constants/constants";
import { apiClient } from "@/utils/apiClient";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { User } from "@/types/auth";

// Zod schema for editing a user
const editUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().email("Invalid email").trim().toLowerCase(),
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
  role: z.string().min(1, "Role is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    )
    .optional()
    .or(z.literal("")),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUserUpdated: () => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      role: "",
      password: "",
    },
  });

  // Reset form whenever user prop changes or dialog opens
  useEffect(() => {
    if (user && isOpen) {
      console.log("Resetting form with user data:", user); // Debug log

      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        role: user.role || "",
        password: "",
      });
    }
  }, [user, isOpen, form]);

  // // Clear form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        role: "",
        password: "",
      });
      setShowPassword(false);
    }
  }, [isOpen, form]);

  const onSubmit = async (data: EditUserFormData) => {
    try {
      setIsLoading(true);
      console.log("Submitting form data:", data); // Debug log

      const updateData = { ...data };
      if (!updateData.password || updateData.password === "") {
        delete updateData.password;
      }

      await apiClient(`http://localhost:8080/api/users/update/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      toast.success("User updated successfully");
      onUserUpdated();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating user:", error); // Debug log
      toast.error(error.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  // Don't render if no user is provided
  if (!user) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(); // only call onClose when closing
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_OPTIONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password{" "}
                      <span className="text-sm text-muted-foreground">
                        (leave empty to keep current)
                      </span>
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
