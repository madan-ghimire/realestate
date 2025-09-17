/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

import { Button } from "@/components/ui/button";

import { Eye, Edit, Trash2 } from "lucide-react";
import { Tenant } from "@/types/tenant";

export function TableComponent({
  data,
  page,
  pageSize,
  onPageChange,
  onEditTenant,
  onDeleteTenant,
  onViewTenant,
}: {
  data: any;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEditTenant: (tenant: Tenant) => void;
  onDeleteTenant: (tenant: Tenant) => void;
  onViewTenant: (tenant: Tenant) => void;
}) {
  // 👉 placeholder handlers (you can wire real logic later)
  const handleView = (user: Tenant) => {
    console.log("View", user);
    onViewTenant(user);
  };

  const handleEdit = (tenant: Tenant) => {
    console.log("Edit button clicked for user:", tenant); // Debug log

    // Ensure we have all the required fields for the User type
    const tenantForEdit: Tenant = {
      id: tenant.id,
      name: tenant.name || "",
      description: tenant.description || "",
      status: tenant.status || "",
      createdAt: tenant.createdAt || "",
    };

    onEditTenant(tenantForEdit);
  };

  // const handleSendEmail = (user: any) => console.log("Send Email", user);
  // const handleActivate = (user: any) => console.log("Activate", user);
  // const handleDeactivate = (user: any) => console.log("Deactivate", user);
  const handleDelete = (tenant: Tenant) => {
    onDeleteTenant(tenant);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>

            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.tenants?.length > 0 ? (
            data.tenants.map((tenant: Tenant) => (
              <TableRow key={tenant.id}>
                <TableCell className="whitespace-nowrap">
                  {tenant.name}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {tenant.description}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {tenant.status ?? "-"}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2 w-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(tenant)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(tenant)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleView(tenant)}
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
              <TableCell colSpan={3} className="text-center py-4">
                No tenants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {data?.tenants?.length > 0 && (
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
