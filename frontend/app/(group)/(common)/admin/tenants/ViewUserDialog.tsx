"use client";

import React, { useEffect } from "react";
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

import { Tenant } from "@/types/tenant";
import { Textarea } from "@/components/ui/textarea";

// Zod schema for editing a user
const editUserSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

interface ViewUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant;
}

export const ViewUserDialog: React.FC<ViewUserDialogProps> = ({
  isOpen,
  onClose,
  tenant,
}) => {
  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Reset form whenever user prop changes or dialog opens
  useEffect(() => {
    if (tenant && isOpen) {
      console.log("Resetting form with tenant data:", tenant); // Debug log

      form.reset({
        name: tenant.name || "",
        description: tenant.description || "",
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

  const onSubmit = () => {};

  const handleClose = () => {
    onClose();
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
          <DialogTitle>View Tenant</DialogTitle>
          <DialogDescription>
            View the tenant information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter tenant name"
                        disabled
                      />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                        placeholder="Enter description"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
