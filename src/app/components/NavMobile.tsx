import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { FaBell, FaCalendarDays, FaCirclePlus, FaClipboardUser, FaFileLines, FaUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";

export const NavMobile = () => {
    const [isOpen, setOpen] = useState(false);
    const [isSubOpen, setSubOpen] = useState(false);
    const ref = useRef(null);
    const refSub = useRef(null);
    const pathname = usePathname();
    const routes = [
        {
            title: "Profile",
            href: "/profile",
            Icon: FaUser,
            children: false,
            subRoutes: []
        },
        {
            title: "Dashboard",
            href: "/dashboard",
            Icon: MdDashboard,
            children: false,
            subRoutes: []
        },
        {
            title: "Reminder",
            href: "/reminder",
            Icon: FaBell,
            children: false,
            subRoutes: []
        },
        {
            title: "Alert",
            href: "/alert",
            Icon: BiSolidAlarmAdd,
            children: false,
            subRoutes: []
        },
        {
            title: "Patient",
            href: "/patient",
            Icon: FaCirclePlus,
            children: true,
            subRoutes: [{
                title: "Add Patient",
                href: "/patient/create",
                children: true,
            }, {
                title: "Patient List",
                href: "/patient",
                children: true,
            }, {
                title: "Active Patients",
                href: "/patient/active",
                children: true,
            },]
        },
        {
            title: "User",
            href: "/user",
            Icon: FaCirclePlus,
            children: true,
            subRoutes: [{
                title: "Add User",
                href: "/user/create",
                children: true,
            }, {
                title: "User List",
                href: "/user",
                children: true,
            }, {
                title: "Active Users",
                href: "/user/active",
                children: true,
            },]
        },
        {
            title: "To do / Wait List",
            href: "/todo",
            Icon: FaFileLines,
            children: false,
            subRoutes: []
        },
        {
            title: "My Calendar",
            href: "/mycalendar",
            Icon: FaCalendarDays,
            children: false,
            subRoutes: []
        },
        {
            title: "Roles",
            href: "/roles",
            Icon: FaClipboardUser,
            children: false,
            subRoutes: []
        },
    ];
    useClickAway(ref, () => {
        setOpen(false);
        setSubOpen(false)
    })
    useClickAway(refSub, () => setSubOpen(false));

    return (
        <div ref={ref} className="lg:hidden absolute top-4 left-2 text-white z-[99]">
            <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 shadow-4xl right-0 top-[5rem] p-5 bg-theme-primary-700 border-b border-b-white/20  h-[100vh] overflow-x-hidden overflow-y-auto"
                    >
                        <ul className="grid gap-2">
                            {routes.map((route, idx) => {
                                const { Icon } = route;
                                if(route.children){
                                    return (
                                        <motion.li
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 0.1 + idx / 10,
                                            }}
                                            key={route.title}
                                            className="w-full p-[0.08rem] rounded-lg"
                                        >
                                                <button ref={refSub} type="button" className={"flex items-center justify-between w-full p-5 rounded-lg bg-theme-primary-400"}
                                                    onClick={() => setSubOpen((prev) => !prev)} >

                                                    <span className="flex items-center gap-1 text-lg">

                                                        <Icon className="text-xl" />
                                                        <span className="flex gap-1 text-lg px-2">{route.title}</span>
                                                    </span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </button>
                                                <ul  className={"py-2 space-y-2 " + (!isSubOpen && "hidden")}>
                                                    {
                                                        route.subRoutes.map((subRoute, subIdx) => {
                                                            return (

                                                                <motion.li
                                                                    initial={{ scale: 0, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    transition={{
                                                                        type: "spring",
                                                                        stiffness: 260,
                                                                        damping: 20,
                                                                        delay: 0.1 + idx / 10,
                                                                    }}
                                                                    key={subRoute.title}
                                                                    className="w-full p-[0.08rem] rounded-lg"
                                                                >
                                                                    <Link
                                                                        // onClick={() => setSubOpen((prev) => !prev)}
                                                                        className={
                                                                            "flex items-center justify-between w-full p-2 rounded-lg bg-theme-primary-100"
                                                                        }
                                                                        href={subRoute.href}
                                                                    >
                                                                        <span className="flex gap-1 text-lg">{subRoute.title}</span>
                                                                    </Link>
                                                                </motion.li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                        </motion.li>
                                    );

                                }
                                return (
                                    <motion.li
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.1 + idx / 10,
                                        }}
                                        key={route.title}
                                        className="w-full p-[0.08rem] rounded-lg bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                                    > 
                                        <Link
                                            onClick={() => setOpen((prev) => !prev)}
                                            className={
                                                "flex items-center justify-start w-full p-5 rounded-lg bg-theme-primary-400"
                                            }
                                            href={route.href}
                                        >
                                            <Icon className="text-xl" />
                                            <span className="flex gap-1 text-lg px-2">{route.title}</span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};