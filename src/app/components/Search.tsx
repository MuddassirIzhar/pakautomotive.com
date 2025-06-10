"use client";

import * as React from "react";
import { FaChevronDown, FaCheck, FaMagnifyingGlass } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const cities = [
	{
		value: "Karachi",
		label: "Karachi",
	},
	{
		value: "Lahore",
		label: "Lahore",
	},
	{
		value: "Islamabad",
		label: "Islamabad",
	},
	{
		value: "Quetta",
		label: "Quetta",
	},
	{
		value: "Hyderabad",
		label: "Hyderabad",
	},
];

const frameworks = [
	{
		value: "5 Lacs",
		label: "5 Lacs",
	},
	{
		value: "10 Lacs",
		label: "10 Lacs",
	},
	{
		value: "15 Lacs",
		label: "15 Lacs",
	},
	{
		value: "20 Lacs",
		label: "20 Lacs",
	},
	{
		value: "25 Lacs",
		label: "25 Lacs",
	},
	{
		value: "30 Lacs",
		label: "30 Lacs",
	},
	{
		value: "35 Lacs",
		label: "35 Lacs",
	},
	{
		value: "40 Lacs",
		label: "40 Lacs",
	},
	{
		value: "45 Lacs",
		label: "45 Lacs",
	},
	{
		value: "50 Lacs",
		label: "50 Lacs",
	},
	{
		value: "55 Lacs",
		label: "55 Lacs",
	},
	{
		value: "60 Lacs",
		label: "60 Lacs",
	},
];

const length = 50;
interface Option {
	value: any;
	label: string;
}

const priceRange: Option[] = [];
let i = 1;

while (i < length) {
    priceRange[i] = { value: i * 1, label: `${i * 5} Lacs` };
    i++;
}


export function Search() {
	const [openLocation, setOpenLocation] = React.useState(false);
	const [openRange, setOpenRange] = React.useState(false);
	const [locationValue, setLocationValue] = React.useState("");
	const [rangeMinValue, setRangeMinValue] = React.useState("");
	const [rangeMaxValue, setRangeMaxValue] = React.useState("");
	return (
		<div className="w-full md:max-w-7xl mx-auto sm:px-6 lg:px-8">
			<div className="flex flex-col justify-center items-center space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0 py-4 w-full">
				<div className="flex flex-col md:flex-row w-full md:w-auto justify-center items-center shadow-xl rounded-xl md:rounded-full p-2 bg-white gap-4 md:gap-0">
					{/* Input Field */}
					<Input
						type="text"
						placeholder="Car, Make or Model"
						className="shadow-none rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white h-16 w-full md:w-80"
					/>

					{/* Location Dropdown */}
					<Popover open={openLocation} onOpenChange={setOpenLocation}>
						<PopoverTrigger className="w-full md:w-40 rounded-full shadow-none" asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openLocation}
								className="w-full md:w-40 flex justify-between h-16 border-0"
							>
								{locationValue
									? cities.find((location) => location.value === locationValue)
										?.label
									: "All Cities"}
								<FaChevronDown className="opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[--radix-popover-trigger-width] md:w-40 p-0 rounded">
							<Command>
								<CommandInput
									placeholder="All Cities"
									className="h-9"
								/>
								<CommandList>
									<CommandEmpty>No Location found.</CommandEmpty>
									<CommandGroup>
										{cities.map((location) => (
											<CommandItem
												key={location.value}
												value={location.value}
												onSelect={(currentValue) => {
													setLocationValue(currentValue === locationValue ? "" : currentValue);
													setOpenLocation(false);
												}}
											>
												{location.label}
												<FaCheck
													className={cn(
														"ml-auto",
														locationValue === location.value
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					{/* Range Dropdown */}
					<Popover open={openRange} onOpenChange={setOpenRange}>
						<PopoverTrigger className="rounded-full shadow-none" asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openRange}
								className="w-full md:w-48 flex justify-between h-16 border-0"
							>
								{(rangeMinValue || rangeMaxValue) ? (rangeMinValue ? rangeMinValue : 0) + ' - ' + rangeMaxValue : "Price Range"}
								<FaChevronDown className="opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full md:w-48 p-0 flex rounded-full">
							<Command>
								<CommandInput
									placeholder="Min"
									className="h-9"
								/>
								<CommandList>
									<CommandEmpty>No Price Range found.</CommandEmpty>
									<CommandGroup>
										{priceRange.map((range) => (
											<CommandItem
												key={range.value}
												value={range.value}
												onSelect={(currentValue) => {
													setRangeMinValue(currentValue === rangeMinValue ? "" : currentValue);
													// setOpenRange(false);
												}}
											>
												{range.label}
												<FaCheck
													className={cn(
														"ml-auto",
														rangeMinValue === range.value
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
							<Command>
								<CommandInput
									placeholder="Max"
									className="h-9"
								/>
								<CommandList>
									<CommandEmpty>No Price Range found.</CommandEmpty>
									<CommandGroup>
										{priceRange.map((range) => (
											<CommandItem
												key={range.value}
												value={range.value}
												onSelect={(currentValue) => {
													setRangeMaxValue(currentValue === rangeMaxValue ? "" : currentValue);
													setOpenRange(false);
												}}
											>
												{range.label}
												<FaCheck
													className={cn(
														"ml-auto",
														rangeMaxValue === range.value
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					{/* Submit Button */}
					<Button className="rounded-0 h-16 w-full md:w-16 rounded-full [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 has-[>svg]:p-2 flex items-center">
						<span className="md:hidden text-xl font-bold uppercase">
							Search
						</span>
						<FaMagnifyingGlass />
						{/* Search */}
					</Button>
				</div>
			</div>
		</div>
	);
}
