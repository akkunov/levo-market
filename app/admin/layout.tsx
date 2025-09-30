"use client";

import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaBox, FaTags, FaAddressBook, FaSignOutAlt } from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";
import {GoShareAndroid} from "react-icons/go";
import Link from "next/link";

type MenuItem = {
    name: string;
    path: string;
    icon: ReactNode;
};

const menu: MenuItem[] = [
    { name: "Продукты", path: "/admin/products", icon: <FaBox /> },
    { name: "Категории", path: "/admin/catalogs", icon: <FaTags /> },
    { name: "Контакты", path: "/admin/contacts", icon: <FaAddressBook /> },
    { name: "Атрибуты", path: "/admin/attributes", icon: <GoShareAndroid /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClientComponentClient();

    const [collapsed, setCollapsed] = useState(false);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <div className="flex flex-col md:flex-row w-screen h-screen">
            {/* Sidebar desktop */}
            <aside
                className={`hidden md:flex flex-col bg-[#FAFAFA] text-[#232321] transition-all duration-300 ${
                    collapsed ? "w-20" : "w-64"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-300 font-bold text-xl">
                    {!collapsed && <span>Admin Panel</span>}
                    <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
                        <CiMenuFries />
                    </Button>
                </div>

                <nav className="flex-1 p-2 space-y-2">
                    <TooltipProvider>
                        {menu.map((item) => (
                            <Tooltip key={item.path}>
                                <TooltipTrigger asChild>
                                    <Link href={item.path}>
                                        <Button
                                            variant={pathname === item.path ? "default" : "ghost"}
                                            className={`w-full justify-start gap-2 px-4 py-2 rounded ${
                                                pathname === item.path && !collapsed ? "bg-[#003F62] text-white" : ""
                                            }`}
                                        >
                                            {item.icon}
                                            {!collapsed && <span>{item.name}</span>}
                                        </Button>
                                    </Link>

                                </TooltipTrigger>
                                {collapsed && (
                                    <TooltipContent>
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>

                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className={`m-4 flex items-center gap-2 justify-center ${collapsed ? "p-2" : "px-4 py-2"}`}
                >
                    <FaSignOutAlt fill={'white'}/>
                    {!collapsed && <span className={`text-white`}>Выйти</span>}
                </Button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-2 overflow-x-auto">{children}</main>

            {/* Bottom navigation mobile (<md) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#FAFAFA] border-t border-gray-300 flex justify-around md:hidden h-12 items-center">
                <TooltipProvider>
                    {menu.map((item) => (
                        <Tooltip key={item.path}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={pathname === item.path ? "default" : "ghost"}
                                    size="icon"
                                    onClick={() => router.push(item.path)}
                                >
                                    {item.icon}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm">{item.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={handleLogout}>
                                <FaSignOutAlt className={`fill-white`} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm">Выйти</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </div>
    );
}
