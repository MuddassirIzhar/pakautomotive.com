"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";

export function RouteProgressProvider() {
  const pathname = usePathname();
  const router = useRouter();

//   useEffect(() => {
//     // NProgress.configure({ showSpinner: false  });
//     NProgress.configure({
//         minimum: 0.3,
//         easing: 'ease',
//         speed: 1000,
//         showSpinner: false,
//       })
//     const handleStart = () => NProgress.start();
//     const handleDone = () => NProgress.done();

//     handleStart(); // start on route start
//     handleDone();  // immediately finish (optional workaround for navigation)

//     // listen to route change completion
//     return () => {
//       NProgress.done();
//     };
//   }, [pathname]);

  useEffect(() => {
    NProgress.configure({
        minimum: 0.5,
        easing: 'ease',
        speed: 1500,
        showSpinner: false,
      })

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.origin === location.origin) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    NProgress.done(); // Route change completed
  }, [pathname]);

  return null;
}
