import React from 'react'
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { Dropdown } from 'flowbite-react';

export function CompanyNav() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { openSidenav } = controller;
    return (
        <nav className="bg-[#191a3e]  px-4 py-3 fixed left-0 right-0 top-0 z-50">
                <div className="flex  items-center">
                    <button
                        data-drawer-target="drawer-navigation"
                        data-drawer-toggle="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="p-2 mr-2 text-teal-600 rounded-lg cursor-pointer md:hidden hover:text-white hover:bg-teal-600 focus:bg-teal-600 focus:text-white focus:ring-2 focus:ring-white"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="hidden w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                    <div
                        className="flex items-center mr-4"
                    >
                        <span className="w-24 h-10  text-2xl font-semibold whitespace-nowrap text-white">
                            Skanat provider dashboard
                        </span>
                    </div>
                </div>
            
        </nav>
    )
}

CompanyNav.displayName = "/src/widgets/CompanyNav.jsx";

export default CompanyNav