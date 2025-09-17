"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DecodedToken, getUserFromToken } from "@/utils/getUserFromToken";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LayoutDashboard,
  Building,
  Users,
  UserCheck,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  ChevronRight,
  Sun,
  Moon,
  CreditCard,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
// import { getToken } from "@/services/http.service";

interface SidebarChildItem {
  title: string;
  href: string;
}

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  children?: SidebarChildItem[];
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  {
    title: "Saas",
    icon: Building,
    href: "/admin/tenants",
    children: [
      { title: "Tenants", href: "/admin/tenants" },
      { title: "Editions", href: "/admin/editions" },
    ],
  },
  {
    title: "Properties",
    icon: Building,
    href: "/dashboard/properties",
    badge: "12",
    children: [
      { title: "All Properties", href: "/dashboard/properties" },
      { title: "Add Property", href: "/dashboard/properties/add" },
      { title: "Property Types", href: "/dashboard/properties/types" },
      { title: "Property Locations", href: "/dashboard/properties/locations" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
    children: [{ title: "All Users", href: "/admin/users" }],
  },
  {
    title: "Agents",
    icon: UserCheck,
    href: "/dashboard/agents",
    badge: "5",
    children: [
      { title: "All Agents", href: "/dashboard/agents/all" },
      { title: "Add Agent", href: "/dashboard/agents/add" },
      { title: "Agent Performance", href: "/dashboard/agents/performance" },
    ],
  },
  { title: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { title: "Documents", icon: FileText, href: "/dashboard/documents" },
  {
    title: "Marketing",
    icon: BarChart3,
    href: "/dashboard/marketing",
    children: [
      { title: "Campaigns", href: "/dashboard/marketing/campaigns" },
      {
        title: "Email Templates",
        href: "/dashboard/marketing/email-templates",
      },
      { title: "Analytics", href: "/dashboard/marketing/analytics" },
    ],
  },
  {
    title: "Finance",
    icon: CreditCard,
    href: "/dashboard/finance",
    children: [
      { title: "Invoices", href: "/dashboard/finance/invoices" },
      { title: "Payments", href: "/dashboard/finance/payments" },
      { title: "Expenses", href: "/dashboard/finance/expenses" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    children: [
      { title: "Profile Settings", href: "/dashboard/settings/profile" },
      { title: "Account Settings", href: "/dashboard/settings/account" },
      {
        title: "Notification Settings",
        href: "/dashboard/settings/notifications",
      },
    ],
  },
];

function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:inline" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<DecodedToken | null>(null);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const userInfo = getUserFromToken();
    // const token = getToken();

    // const fetchToken = async () => {
    //   const token = await getToken();
    //   console.log("check token here i am", token);
    // };

    // console.log("check token here i am", token);

    // console.log("check user info", userInfo);
    if (!userInfo) {
      router.replace("/auth/signin");
    } else if (
      userInfo.role !== "ADMINISTRATOR" &&
      userInfo.role !== "SUPER_ADMIN"
    ) {
      router.replace("/unauthorized"); // Or show error message
    } else {
      setUser(userInfo);
    }

    // fetchToken();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isActiveItem = (href: string) => {
    return href === pathname || pathname.startsWith(href);
  };

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // const Sidebar = () => {
  //   const [searchTerm, setSearchTerm] = useState("");

  //   const filteredItems = sidebarItems
  //     .map((item) => {
  //       const matchesParent = item.title
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());

  //       const filteredChildren = item.children?.filter((child) =>
  //         child.title.toLowerCase().includes(searchTerm.toLowerCase())
  //       );

  //       if (
  //         matchesParent ||
  //         (filteredChildren && filteredChildren.length > 0)
  //       ) {
  //         return { ...item, children: filteredChildren };
  //       }

  //       return null;
  //     })
  //     .filter((item): item is NonNullable<typeof item> => item !== null); // ✅ Type guard

  //   return (
  //     <div className="flex flex-col justify-between h-full pb-4 px-4 py-4">
  //       <div>
  //         {/* Sticky header */}
  //         <Link href="/dashboard">
  //           <div className="flex items-center mb-6 sticky top-0 bg-muted/40 backdrop-blur z-10 py-4">
  //             <Home className="h-8 w-8 text-blue-600" />
  //             <h2 className="ml-2 text-lg font-semibold cursor-pointer">
  //               Realtor Dashboard
  //             </h2>
  //           </div>
  //         </Link>

  //         {/* Search input */}
  //         <div className="mb-4 sticky top-[72px] bg-muted/40 backdrop-blur z-10 px-2 py-1 rounded">
  //           <input
  //             type="text"
  //             placeholder="Search menu..."
  //             className="w-full rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //           />
  //         </div>

  //         {/* Scrollable menu container */}
  //         <div className="overflow-y-auto max-h-[calc(100vh-96px)]">
  //           <div className="space-y-1">
  //             {filteredItems.length === 0 ? (
  //               <div className="text-center text-muted-foreground py-4">
  //                 No results found
  //               </div>
  //             ) : (
  //               filteredItems.map(
  //                 ({ title, icon: Icon, href, badge, children }) => {
  //                   const active = isActiveItem(href);
  //                   const isOpen = openMenus[title];

  //                   // if submenu exists
  //                   if (children && children.length > 0) {
  //                     return (
  //                       <div key={title}>
  //                         <Button
  //                           variant={active ? "secondary" : "ghost"}
  //                           onClick={() => toggleMenu(title)}
  //                           className={`w-full justify-between cursor-pointer ${
  //                             active
  //                               ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
  //                               : ""
  //                           }`}
  //                         >
  //                           <div className="flex items-center">
  //                             <Icon className="mr-2 h-4 w-4" />
  //                             {title}
  //                           </div>

  //                           <div className="flex items-center space-x-2">
  //                             {badge && (
  //                               <Badge variant="secondary">{badge}</Badge>
  //                             )}
  //                             {isOpen ? (
  //                               <ChevronDown className="h-4 w-4" />
  //                             ) : (
  //                               <ChevronRight className="h-4 w-4" />
  //                             )}
  //                           </div>
  //                         </Button>

  //                         {isOpen && (
  //                           <div className="ml-6 mt-1 flex flex-col space-y-1">
  //                             {children.map(
  //                               ({ title: childTitle, href: childHref }) => {
  //                                 const childActive = isActiveItem(childHref);
  //                                 return (
  //                                   <Link key={childTitle} href={childHref}>
  //                                     <Button
  //                                       variant={
  //                                         childActive ? "secondary" : "ghost"
  //                                       }
  //                                       className={`w-full cursor-pointer justify-start text-sm ${
  //                                         childActive
  //                                           ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
  //                                           : ""
  //                                       }`}
  //                                     >
  //                                       {childTitle}
  //                                     </Button>
  //                                   </Link>
  //                                 );
  //                               }
  //                             )}
  //                           </div>
  //                         )}
  //                       </div>
  //                     );
  //                   }
  //                   // No submenu - normal menu item
  //                   return (
  //                     <Link key={title} href={href}>
  //                       <Button
  //                         variant={active ? "secondary" : "ghost"}
  //                         className={`w-full cursor-pointer justify-start ${
  //                           active
  //                             ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
  //                             : ""
  //                         }`}
  //                       >
  //                         <Icon className="mr-2 h-4 w-4" />
  //                         {title}
  //                         {badge && (
  //                           <Badge variant="secondary" className="ml-auto">
  //                             {badge}
  //                           </Badge>
  //                         )}
  //                         {active && (
  //                           <ChevronRight className="ml-auto h-4 w-4" />
  //                         )}
  //                       </Button>
  //                     </Link>
  //                   );
  //                 }
  //               )
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       {/* 👇 User Profile Dropdown at Bottom */}
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted cursor-pointer transition-colors">
  //             <Avatar className="h-8 w-8">
  //               <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
  //               <AvatarFallback>
  //                 {user?.username?.charAt(0).toUpperCase() || "A"}
  //               </AvatarFallback>
  //             </Avatar>
  //             <div className="text-left overflow-hidden">
  //               <p className="text-sm font-medium truncate">{user?.email}</p>
  //               <p className="text-xs text-muted-foreground truncate">
  //                 {user?.email}
  //               </p>
  //             </div>
  //           </div>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent side="top" align="start" className="w-60">
  //           <DropdownMenuLabel>
  //             <div className="flex flex-col space-y-1">
  //               <p className="text-sm font-medium">{user?.username}</p>
  //               <p className="text-xs text-muted-foreground">{user?.email}</p>
  //             </div>
  //           </DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link
  //               href="/dashboard/profile"
  //               className="flex items-center w-full"
  //             >
  //               <UserCheck className="mr-2 h-4 w-4" />
  //               Profile
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link
  //               href="/dashboard/billing"
  //               className="flex items-center w-full"
  //             >
  //               <Bell className="mr-2 h-4 w-4" />
  //               Notifications
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link
  //               href="/dashboard/billing"
  //               className="flex items-center w-full"
  //             >
  //               <CreditCard className="mr-2 h-4 w-4" />
  //               Billing
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem className="text-red-600">
  //             <Link href="/auth/logout" className="flex items-center w-full">
  //               <LogOut className="mr-2 h-4 w-4" />
  //               Sign out
  //             </Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>
  //   );
  // };

  const Sidebar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = sidebarItems
      .map((item) => {
        const matchesParent = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const filteredChildren = item.children?.filter((child) =>
          child.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (
          matchesParent ||
          (filteredChildren && filteredChildren.length > 0)
        ) {
          return { ...item, children: filteredChildren };
        }

        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return (
      <div className="flex flex-col h-full">
        {/* TOP FIXED SECTION */}
        <div className="sticky top-0 z-20 bg-muted/40 backdrop-blur px-4 py-4 border-b">
          {/* Logo */}
          <Link href="/dashboard">
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 text-blue-600" />
              <h2 className="ml-2 text-lg font-semibold cursor-pointer">
                Realtor Dashboard
              </h2>
            </div>
          </Link>

          {/* Search input */}
          <div>
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* SCROLLABLE MENU ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            {filteredItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No results found
              </div>
            ) : (
              filteredItems.map(
                ({ title, icon: Icon, href, badge, children }) => {
                  const active = isActiveItem(href);
                  const isOpen = openMenus[title];

                  if (children && children.length > 0) {
                    return (
                      <div key={title}>
                        <Button
                          variant={active ? "secondary" : "ghost"}
                          onClick={() => toggleMenu(title)}
                          className={`w-full justify-between cursor-pointer ${
                            active
                              ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                              : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <Icon className="mr-2 h-4 w-4" />
                            {title}
                          </div>
                          <div className="flex items-center space-x-2">
                            {badge && (
                              <Badge variant="secondary">{badge}</Badge>
                            )}
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </Button>
                        {isOpen && (
                          <div className="ml-6 mt-1 flex flex-col space-y-1">
                            {children.map(
                              ({ title: childTitle, href: childHref }) => {
                                const childActive = isActiveItem(childHref);
                                return (
                                  <Link key={childTitle} href={childHref}>
                                    <Button
                                      variant={
                                        childActive ? "secondary" : "ghost"
                                      }
                                      className={`w-full cursor-pointer justify-start text-sm ${
                                        childActive
                                          ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                                          : ""
                                      }`}
                                    >
                                      {childTitle}
                                    </Button>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link key={title} href={href}>
                      <Button
                        variant={active ? "secondary" : "ghost"}
                        className={`w-full cursor-pointer justify-start ${
                          active
                            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                            : ""
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {title}
                        {badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {badge}
                          </Badge>
                        )}
                        {active && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Button>
                    </Link>
                  );
                }
              )
            )}
          </div>
        </div>

        {/* FIXED PROFILE AT BOTTOM */}
        <div className="px-4 py-2 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.png" alt="User" />
                  <AvatarFallback>
                    {user?.username?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-60">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center w-full"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center w-full"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center w-full"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Link href="/auth/logout" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-70 border-r ml-1 bg-muted/40 ">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-14 lg:h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search properties, users, or documents..."
                  className="w-full bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <ModeToggle />

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.png" alt="User" />
                  <AvatarFallback className="cursor-pointer">
                    {user.username?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Link href="/auth/logout" className="flex ">
                  <LogOut className="mr-4 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
