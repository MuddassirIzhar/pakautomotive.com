"use client";
import { IButtonType } from "@/app/interfaces/IButtonType";
import React from "react";
import { FaSpinner } from "react-icons/fa6";

const ButtonElement = ({className,label,type,isLoading,onClick}:{className?:string,label:string,type:IButtonType,isLoading?:boolean, onClick?: () => void;}) => {
    return (
        <>
            <button 
                onClick={onClick}
                disabled={isLoading}
                type={type}
                className={`${className} flex items-center justify-center gap-2 px-10 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 ${isLoading ? ' bg-theme-primary-800 hover:bg-theme-primary-800 cursor-not-allowed' :' bg-theme-primary-600 hover:bg-theme-primary-800 cursor-pointer'}`}
            >
                {isLoading ? <><FaSpinner className="animate-spin-slow" /> Loading... </> : <> {label} </>}
                    
            </button>
        </>
    );
};

export default ButtonElement;