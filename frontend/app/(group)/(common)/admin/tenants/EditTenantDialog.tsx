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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { apiClient } from "@/utils/apiClient";
import { Loader2 } from "lucide-react";
import { Tenant } from "@/types/tenant";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TenantStatusOptions } from "@/constants/constants";

// Zod schema for editing a user
const editTenantSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  status: z.string().min(1, "Status is required"),
});

export type EditTenantFormData = z.infer<typeof editTenantSchema>;

interface EditTenantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant;
  onUserUpdated: () => void;
}

export const EditTenantDialog: React.FC<EditTenantDialogProps> = ({
  isOpen,
  onClose,
  tenant,
  onUserUpdated,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditTenantFormData>({
    resolver: zodResolver(editTenantSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
    },
  });

  // Reset form whenever user prop changes or dialog opens
  useEffect(() => {
    if (tenant && isOpen) {
      form.reset({
        name: tenant.name || "",
        description: tenant.description || "",
        status: tenant.status || "",
      });
    }
  }, [tenant, isOpen, form]);

  // // Clear form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [isOpen, form]);

  const onSubmit = async (data: EditTenantFormData) => {
    try {
      setIsLoading(true);
      console.log("Submitting form data:", data); // Debug log

      await apiClient(`http://localhost:8080/api/tenants/${tenant.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      toast.success("Tenant updated successfully");
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

  // Don't render if no tenant is provided
  if (!tenant) {
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
          <DialogTitle>Edit Tenant</DialogTitle>
          <DialogDescription>
            Update the tenant information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter tenant name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...field}
                      placeholder="Enter Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    defaultValue=""
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TenantStatusOptions.map((r) => (
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
