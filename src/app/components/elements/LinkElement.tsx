"use client";
import Link from "next/link";
import React from "react";

const LinkElement = ({ href, label }: { href: string, label: string }) => {
    return (
        <Link
            href={href}
            className="px-10 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-theme-primary-600 rounded-lg hover:bg-theme-primary-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            {label}
        </Link>
    );
};

export default LinkElement;