"use client";

import * as React from "react";
import {
	BookOpen,
	Bot,
	ChevronRight,
	Command,
	File,
	Folder,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
} from "lucide-react";
import { FaRegRectangleList, FaWpforms, FaUserCheck, FaUserShield, FaUserGear, FaList, FaListUl, FaHouse, FaAppStoreIos, FaUsers, FaTableList, FaSquarePlus, FaSitemap, FaMap, FaRegFlag, FaGlobe, FaRegMap, FaMapLocationDot, FaRegBuilding, FaArrowDownUpAcrossLine, FaShuffle, FaShareNodes, FaCircleNodes, FaBlog } from "react-icons/fa6";
import { FaAd, FaCopyright } from "react-icons/fa";



import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Image from "next/image";
// import LogoImg from "@/assets/logo.png";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from "next-auth";
import { BiSolidCategory } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { usePathname } from "next/navigation";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	
    const pathname = usePathname(); // Get the current route path
	const { data: session } = useSession();
	const [userData, setUserData] = useState<User | null>(null);
	const [path, setPath] = useState<string | null>(null);
    // Update `isActive` whenever `pathname` changes
    useEffect(() => {
		setPath(pathname);
	},[pathname])
	// useEffect(() => {
	// 	if (session?.user) {
	// 		setUserData(session?.user);
	// 	}
	// }, [session]);
    const [data, setData] = useState({
		user: {
			name: `${userData?.name}`,
			email: `${userData?.email}`,
			image: "/avatars/shadcn.jpg",
		},
		navMain: [
			{
				title: "Dashboard",
				url: "/dashboard",
				collapsible: false,
				icon: FaHouse,
				isActive: pathname === "/dashboard",
			},
			{
				title: "Ads",
				url: "#",
				collapsible: true,
				icon: FaAd,
				isActive: pathname === "/ads" || pathname === "/ads/create",
				items: [
					{
						title: "Listing", // Cars, Bikes, Trucks
						url: "/ads",
						icon: FaListUl,
						isActive: pathname === "/ads",
					},
					{
						title: "Create", // Toyota, Honda, Ford
						url: "/ads/create",
						icon: FaWpforms,
						isActive: pathname === "/ads/create",
					},
				],
			},
			{
				title: "Options",
				url: "#",
				collapsible: true,
				icon: FaSitemap,
				isActive: pathname === "/categories" || pathname === "/sub-categories" || pathname === "/brands" || pathname === "/models" || pathname === "/variants",
				items: [
					{
						title: "Categories", // Cars, Bikes, Trucks
						url: "/categories",
						icon: MdCategory,
						isActive: pathname === "/categories",
					},
					{
						title: "Sub Categories", // Cars => Sadan, Hatchback, Bikes => Streetike, SuperBike, Trucks => Heavy Truck, Trailer, 
						url: "/sub-categories",
						icon: BiSolidCategory,
						isActive: pathname === "/sub-categories",
					},
					{
						title: "Brands", // Toyota, Honda, Ford
						url: "/brands",
						icon: FaCopyright,
						isActive: pathname === "/brands",
					},
					{
						title: "Model", // Corolla, Civic, Mustang
						url: "/models",
						icon: FaShareNodes,
						isActive: pathname === "/models",
					},
					{
						title: "Variants", // 1.8, 2.0, 2.3
						url: "/variants",
						icon: FaCircleNodes,
						isActive: pathname === "/variants",
					},
				],
			},
			{
				title: "Blogs",
				url: "#",
				collapsible: true,
				icon: FaBlog,
				isActive: pathname === "/blogs" || pathname === "/blogs/create",
				items: [
					{
						title: "Listing", // Cars, Bikes, Trucks
						url: "/blogs",
						icon: FaListUl,
						isActive: pathname === "/blogs",
					},
					{
						title: "Create", // Toyota, Honda, Ford
						url: "/blogs/create",
						icon: FaWpforms,
						isActive: pathname === "/blogs/create",
					},
				],
			},
			{
				title: "Users",
				url: "#",
				collapsible: true,
				icon: FaUsers,
				isActive: pathname === "#",
				items: [
					{
						title: "Admin",
						url: "#",
						icon: FaUserGear,
						isActive: pathname === "#",
					},
					{
						title: "Dealers",
						url: "#",
						icon: FaUserShield,
						isActive: pathname === "#",
					},
					{
						title: "Customers",
						url: "#",
						icon: FaUserCheck,
						isActive: pathname === "#",
					},
				],
			},
			{
				title: "Locations",
				url: "#",
				collapsible: true,
				icon: FaGlobe,
				isActive: pathname === "#",
				items: [
					{
						title: "Countries",
						url: "#",
						icon: FaRegFlag,
						isActive: pathname === "#",
					},
					{
						title: "States",
						url: "#",
						icon: FaRegMap,
						isActive: pathname === "#",
					},
					{
						title: "Customers",
						url: "#",
						icon: FaRegBuilding,
						isActive: pathname === "#",
					},
				],
			},
			// {
			// 	title: "Models",
			// 	url: "#",
			// 	collapsible:true,
			// 	icon: Bot,
			// 	items: [
			// 		{
			// 			title: "Genesis",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Explorer",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Quantum",
			// 			url: "#",
			// 		},
			// 	],
			// },
			// {
			// 	title: "Documentation",
			// 	url: "#",
			// 	collapsible:true,
			// 	icon: BookOpen,
			// 	items: [
			// 		{
			// 			title: "Introduction",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Get Started",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Tutorials",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Changelog",
			// 			url: "#",
			// 		},
			// 	],
			// },
			// {
			// 	title: "Settings",
			// 	url: "#",
			// 	collapsible:true,
			// 	icon: Settings2,
			// 	items: [
			// 		{
			// 			title: "General",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Team",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Billing",
			// 			url: "#",
			// 		},
			// 		{
			// 			title: "Limits",
			// 			url: "#",
			// 		},
			// 	],
			// },
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
				isActive: pathname === "#",
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
				isActive: pathname === "#",
			},
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame,
				isActive: pathname === "#",
			},
			{
				name: "Sales & Marketing",
				url: "#",
				icon: PieChart,
				isActive: pathname === "#",
			},
			{
				name: "Travel",
				url: "#",
				icon: Map,
				isActive: pathname === "#",
			},
		],
		// tree: [
		// 	[
		// 		"Options",
		// 		"Companies",
		// 		"Models"
		// 	],
		// 	[
		// 		"Categories",
		// 		[
		// 			"api",
		// 			["hello", ["route.ts"]],
		// 			"page.tsx",
		// 			"layout.tsx",
		// 			["blog", ["page.tsx"]],
		// 		],
		// 	],
		// 	[
		// 		"components",
		// 		["ui", "button.tsx", "card.tsx"],
		// 		"header.tsx",
		// 		"footer.tsx",
		// 	],
		// 	["lib", ["util.ts"]],
		// 	["public", "favicon.ico", "vercel.svg"],
		// 	".eslintrc.json",
		// 	".gitignore",
		// 	"next.config.js",
		// 	"tailwind.config.js",
		// 	"package.json",
		// 	"README.md",
		// ],
	});


    // Update `isActive` whenever `pathname` changes
    useEffect(() => {
        const updatedNavMain = data.navMain.map((item) => ({
            ...item,
			isActive: item.url === pathname || (item.items ? item.items.some(subItem => subItem.url === pathname) : false),
            items: item.items ? item.items.map((subItem) => ({
                ...subItem,
				isActive: subItem.url === pathname || false,
            })) : undefined,
        }));

        const updatedNavSecondary = data.navSecondary.map((item) => ({
            ...item,
            isActive: item.url === pathname,
        }));

        const updatedProjects = data.projects.map((item) => ({
            ...item,
            isActive: item.url === pathname,
        }));

        setData((prevData) => ({
            ...prevData,
            navMain: updatedNavMain,
            navSecondary: updatedNavSecondary,
            projects: updatedProjects,
        }));
    }, [pathname]);

    // Update user data when session changes
    useEffect(() => {
        if (session?.user) {
            setUserData(session.user);
            setData((prevData) => ({
                ...prevData,
                user: {
                    name: session.user.name || "",
                    email: session.user.email || "",
                    image: "/avatars/shadcn.jpg",
                },
            }));
        }
    }, [session]);
	return (
		<Sidebar
			className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lgtext-sidebar-primary-foreground">
									{/* <Command className="size-4" /> */}
									{/* <Image src={LogoImg} className="w-32 mx-auto" priority alt="Logo" /> */}
									<FaAppStoreIos size={36} />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">PakAutomotive</span>
									<span className="truncate text-xs">This is the description of the app.</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className="mt-auto" /> */}

				{/* <SidebarGroup>
					<SidebarGroupLabel>Files</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.tree.map((item, index) => (
								<Tree key={index} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
		</Sidebar>
	);
}

// function Tree({ item }: { item: string | any[] }) {
// 	const [name, ...items] = Array.isArray(item) ? item : [item];

// 	if (!items.length) {
// 		return (
// 			<SidebarMenuButton
// 				isActive={name === "button.tsx"}
// 				className="data-[active=true]:bg-transparent"
// 			>
// 				<File />
// 				{name}
// 			</SidebarMenuButton>
// 		);
// 	}

// 	return (
// 		<SidebarMenuItem>
// 			<Collapsible
// 				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
// 				defaultOpen={name === "components" || name === "ui"}
// 			>
// 				<CollapsibleTrigger asChild>
// 					<SidebarMenuButton>
// 						<ChevronRight className="transition-transform" />
// 						<Folder />
// 						{name}
// 					</SidebarMenuButton>
// 				</CollapsibleTrigger>
// 				<CollapsibleContent>
// 					<SidebarMenuSub>
// 						{items.map((subItem, index) => (
// 							<Tree key={index} item={subItem} />
// 						))}
// 					</SidebarMenuSub>
// 				</CollapsibleContent>
// 			</Collapsible>
// 		</SidebarMenuItem>
// 	);
// }
