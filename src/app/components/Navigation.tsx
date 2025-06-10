"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

import Image from "next/image";
import LogoImg from "@/assets/logo.png";

const allIconLibraries: {
	[key: string]: {
		[key: string]: React.ComponentType<{ size?: number; color?: string }>;
	};
} = {
	fa: FaIcons,
	fa6: Fa6Icons,
	ai: AiIcons,
	md: MdIcons,
	bs: BsIcons,
	io: IoIcons,
	ri: RiIcons,
	fi: FiIcons,
};

export const DynamicIcon = ({
	library,
	iconName,
	size = 24,
	color = "black",
}: {
	library: string;
	iconName: string;
	size?: number;
	color?: string;
}) => {
	const IconComponent = allIconLibraries[library]?.[iconName];

	if (!IconComponent) {
		return (
			<p>
				Icon "{iconName}" not found in library "{library}"!
			</p>
		);
	}

	return <IconComponent size={size} color={color} />;
};

const usedCars: {
	title: string;
	heading: string;
	href: string;
	description: string;
	icon: { library: string; iconName: string };
	rel: string;
}[] = [
		{
			title: "Used Cars Search",
			heading: "Find Used Cars for Sale",
			href: "/used-cars/search/-/",
			description: "Search from over 110k options",
			icon: {
				library: "fa6",
				iconName: "FaMagnifyingGlass",
			},
			rel: "follow",
		},
		{
			title: "Featured Used Cars",
			heading: "Featured Used Cars",
			href: "/used-cars/search/-/featured_1/?nf=true",
			description: "View featured cars by PakWheels",
			icon: {
				library: "fa6",
				iconName: "FaStar",
			},
			rel: "follow",
		},
		{
			title: "Sell Cars in Pakistan",
			heading: "Sell Your Car",
			href: "/used-cars/sell",
			description: "Post a free ad and sell your car quickly",
			icon: {
				library: "fa6",
				iconName: "FaTag",
			},
			rel: "follow",
		},
		{
			title: "Used Cars Dealers in Pakistan",
			heading: "Used Car Dealers",
			href: "/used-cars/dealers",
			description: "Find used car dealers near your",
			icon: {
				library: "fa6",
				iconName: "FaBook",
			},
			rel: "follow",
		},
		{
			title: "Car Price Valuation",
			heading: "Price Calculator",
			href: "/used-cars/price-calculator/",
			description: "Calculate the market price of cars",
			icon: {
				library: "fa6",
				iconName: "FaBullseye",
			},
			rel: "follow",
		},
	];

const newCars: {
	title: string;
	heading: string;
	href: string;
	description: string;
	icon: { library: string; iconName: string };
	rel: string;
}[] = [
		{
			title: "Research New Cars in Pakistan, Car Prices, Reviews and Comparisons",
			heading: "Find New Cars",
			href: "/new-cars/",
			description: "See new cars in Pakistan",
			icon: {
				library: "fa6",
				iconName: "FaMagnifyingGlass",
			},
			rel: "follow",
		},
		{
			title: "Car Comparisons",
			heading: "Car Comparisons",
			href: "/new-cars/compare/",
			description: "Compare cars and find their differences",
			icon: {
				library: "fa6",
				iconName: "FaTableColumns",
			},
			rel: "follow",
		},
		{
			title: "Reviews",
			heading: "Reviews",
			href: "/new-cars/reviews/",
			description: "Read reviews of all cars in Pakistan",
			icon: {
				library: "fa6",
				iconName: "FaComments",
			},
			rel: "follow",
		},
		{
			title: "Car Prices in Pakistan",
			heading: "Prices",
			href: "/new-cars/pricelist/",
			description: "See prices of new cars",
			icon: {
				library: "fa6",
				iconName: "FaTag",
			},
			rel: "follow",
		},
		{
			title: "Get Instant On Road Price",
			heading: "On Road Price",
			href: "/new-cars/on-road-price",
			description: "Calculate the total cost of new car",
			icon: {
				library: "fa6",
				iconName: "FaRoad",
			},
			rel: "follow",
		},
		{
			title: "New Cars Dealers in Pakistan",
			heading: "New Car Dealers",
			href: "/new-cars/dealers/",
			description: "Find new car dealers",
			icon: {
				library: "fa6",
				iconName: "FaBook",
			},
			rel: "follow",
		},
	];

export function Navigation() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  

	const isActive = (path: string) => {
		let activeClass = "";
		if (pathname === path) {
			activeClass = "border-b-primary border-b-2 text-primary";
		}
		return activeClass;
	};
	return (

		<div className="flex items-center justify-between md:justify-start">

		<div className="flex items-center h-16 w-64">
			<Link href="/">
				<div className="flex items-center justify-start">
					<Image src={LogoImg} className="h-28 w-auto mx-auto" priority alt="Logo" />
				</div>
			</Link>
		</div>
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList className="text-gray-800">
				<NavigationMenuItem>
					<NavigationMenuTrigger>New Cars</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[1020px] ">
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{newCars.map((newCar) => (
									<ListItem
										heading={newCar.heading}
										description={newCar.description}
										rel={newCar.rel}
										key={newCar.title}
										title={newCar.title}
										href={newCar.href}
										icon={newCar.icon}
									>
										{newCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{newCars.map((newCar) => (
									<ListItem
										heading={newCar.heading}
										description={newCar.description}
										rel={newCar.rel}
										key={newCar.title}
										title={newCar.title}
										href={newCar.href}
										icon={newCar.icon}
									>
										{newCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{newCars.map((newCar) => (
									<ListItem
										heading={newCar.heading}
										description={newCar.description}
										rel={newCar.rel}
										key={newCar.title}
										title={newCar.title}
										href={newCar.href}
										icon={newCar.icon}
									>
										{newCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{newCars.map((newCar) => (
									<ListItem
										heading={newCar.heading}
										description={newCar.description}
										rel={newCar.rel}
										key={newCar.title}
										title={newCar.title}
										href={newCar.href}
										icon={newCar.icon}
									>
										{newCar.description}
									</ListItem>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Used Cars</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[1020px] ">
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{usedCars.map((userCar) => (
									<ListItem
										heading={userCar.heading}
										description={userCar.description}
										rel={userCar.rel}
										key={userCar.title}
										title={userCar.title}
										href={userCar.href}
										icon={userCar.icon}
									>
										{userCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{usedCars.map((userCar) => (
									<ListItem
										heading={userCar.heading}
										description={userCar.description}
										rel={userCar.rel}
										key={userCar.title}
										title={userCar.title}
										href={userCar.href}
										icon={userCar.icon}
									>
										{userCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{usedCars.map((userCar) => (
									<ListItem
										heading={userCar.heading}
										description={userCar.description}
										rel={userCar.rel}
										key={userCar.title}
										title={userCar.title}
										href={userCar.href}
										icon={userCar.icon}
									>
										{userCar.description}
									</ListItem>
								))}
							</ul>
							<ul className="first:border-none border-l-2 grid gap-1 px-4">
								{usedCars.map((userCar) => (
									<ListItem
										heading={userCar.heading}
										description={userCar.description}
										rel={userCar.rel}
										key={userCar.title}
										title={userCar.title}
										href={userCar.href}
										icon={userCar.icon}
									>
										{userCar.description}
									</ListItem>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink
							className={`${isActive(
								"/videos"
							)} ${navigationMenuTriggerStyle()}`}
						>
							Videos
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink
							className={`${isActive(
								"/forums"
							)} ${navigationMenuTriggerStyle()}`}
						>
							Forums
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink
							className={`${isActive("/blog")} ${navigationMenuTriggerStyle()}`}
						>
							Blog
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/dashboard" legacyBehavior passHref>
						<NavigationMenuLink
							className={`${isActive("/dashboard")} ${navigationMenuTriggerStyle()}`}
						>
							Dashboard
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
		{/* Mobile Menu Toggle Button */}
		<Button
			variant="ghost"
			className="md:hidden"
			onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
		>
			<FaIcons.FaBars />
		</Button>

		{/* Mobile Navigation Menu */}
		{isMobileMenuOpen && (
		<div className="absolute top-20 left-0 right-0 bg-background md:hidden ">
			<NavigationMenu orientation="vertical" className="w-full">
			<NavigationMenuList className="flex flex-col space-y-2 p-4">
				<NavigationMenuItem>
				<NavigationMenuLink href="/used-cars/search/-/">Used Cars</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
				<NavigationMenuLink href="/new-cars/">New Cars</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
				<NavigationMenuLink href="/blog">Blog</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
				<NavigationMenuLink href="/forums">Forums</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
				<NavigationMenuLink href="/contact-us">Contact Us</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
			</NavigationMenu>
		</div>
		)}
	  </div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & {
		icon?: { library: string; iconName: string };
		heading?: string;
		href: string;
		description: string;
	}
>(
	(
		{ className, title, heading, description, icon, children, ...props },
		ref
	) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						title={title}
						{...props}
					>
						<div className="flex gap-x-4">
							<span>
								{icon && (
									<DynamicIcon
										library={icon.library}
										iconName={icon.iconName}
										size={18}
									/>
								)}
							</span>
							<span>
								<strong className="text-sm font-medium leading-none">
									{heading}
								</strong>
								<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
									{children}
								</p>
							</span>
						</div>
					</Link>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
