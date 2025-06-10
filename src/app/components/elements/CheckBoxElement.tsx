"use client";
import React, { forwardRef, HTMLProps, Ref } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
    label: string;
    error?: string;
}

const CheckBoxElement = forwardRef((props:InputProps, ref: Ref<HTMLInputElement>) => {
    const { id, value, label, error, ...inputProps} = props;

    return (
        <>
        <input 
            { ...inputProps }
            ref={ref}
            id={id} 
            value={value}
            type="checkbox" 
            className="w-4 h-4 text-theme-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-theme-primary-500 dark:focus:ring-theme-primary-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
        />
        <label 
            htmlFor={id} 
            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
        </label>
        <div className="text-sm text-red-500 mt-1">{error}</div>
        {/* <div className="relative">
            <input 
                { ...inputProps }
                ref={ref}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-theme-primary-500 focus:outline-none focus:ring-0 focus:border-theme-primary-600 peer"
            />
            <label 
                htmlFor={id}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-theme-primary-600 peer-focus:dark:text-theme-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {label}
            </label>
        </div>
        <div className="text-sm text-red-500 mt-1">{error}</div> */}
        </>
    );
});
export default CheckBoxElement;