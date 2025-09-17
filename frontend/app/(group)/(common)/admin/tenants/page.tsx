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
} from "@/components/ui/dropdown-menu";

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
import { AddTenantDialog } from "./AddTenantDialog";
import { EditTenantDialog } from "./EditTenantDialog";
import toast from "react-hot-toast";
import { ViewUserDialog } from "./ViewUserDialog";
import { Tenant } from "@/types/tenant";

const Tenants = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const [tenantToView, setTenantToView] = useState<Tenant | null>(null);

  const [selectedUser, setSelectedUser] = useState<Tenant | null>(null);

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userData", page, pageSize, search],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`http://localhost:8080/api/tenants/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      return res.json();
    },
  });

  console.log("check user data", data);

  const deleteUser = async (id: string): Promise<void> => {
    const token = await getToken();
    const response = await fetch(`http://localhost:8080/api/tenants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete user");
    }
    toast.success("Tenant deleted successfully");
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: () => {
      // Show loading state
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setIsDeleteOpen(false);
      setTenantToDelete(null);
      console.log("User deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user:", error.message);
      setIsDeleteOpen(false);
      setTenantToDelete(null);
    },
  });

  const handleAddUser = () => {
    setIsAddOpen(true);
  };

  const handleEditUser = (tenant: Tenant) => {
    console.log("handleEditUser called with user:", tenant);

    // Ensure we have a complete user object with all required fields
    const completeTenant: Tenant = {
      id: tenant.id,
      name: tenant.name || "",
      description: tenant.description || "",
      status: tenant.status || "",
      createdAt: tenant.createdAt || "",
    };

    setSelectedUser(completeTenant);
    setIsEditOpen(true);
  };

  const handleDeleteTenant = (tenant: Tenant) => {
    setIsDeleteOpen(true);

    console.log("Deleting user:", tenant);
    setTenantToDelete(tenant);
  };

  const handleCloseEdit = () => {
    console.log("handleCloseEdit called"); // Debug log
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleViewTenant = (tenant: Tenant) => {
    setIsViewOpen(true);
    setTenantToView(tenant);
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
    if (tenantToDelete) {
      deleteUserMutation.mutate(tenantToDelete.id);
    }
  };

  if (isLoading) return <p>Loading..</p>;

  console.log("check data i1", data);

  const handleExportPDF = () => {};

  return (
    <div>
      <div className="mb-2">
        <BreadcrumbWithCustomSeparator />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UsersIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Tenant Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all tenants
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            Total: {data?.totalCount || 0} tenants
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
                onClick={handleExportPDF}
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
            Add Tenant
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
          <CardTitle className="text-lg">Tenants List</CardTitle>
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
            onEditTenant={handleEditUser}
            onDeleteTenant={handleDeleteTenant}
            onViewTenant={handleViewTenant}
          />
        </CardContent>
      </Card>

      {isAddOpen && (
        <AddTenantDialog
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onTenantCreated={() => refetch()}
        />
      )}

      {/* Edit User Dialog - Only render when we have a selected user */}
      {selectedUser && isEditOpen && (
        <EditTenantDialog
          key={selectedUser.id}
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          tenant={selectedUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {tenantToView && isViewOpen && (
        <ViewUserDialog
          key={tenantToView.id}
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          tenant={tenantToView}
        />
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for <strong>{tenantToDelete?.name}</strong> and
              remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteOpen(false);
                setTenantToDelete(null);
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
                "Delete Tenant"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tenants;
