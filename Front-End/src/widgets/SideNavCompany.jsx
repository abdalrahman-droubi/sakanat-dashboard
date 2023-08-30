import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

// icons
import { SiCircle } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import { TfiQuoteRight } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import { UserDataContext } from "@/context/userDataContext";


export function SideNavCompany({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { userRefresh } = useContext(UserDataContext)

  const handleLogOut = () => {
    localStorage.clear();
    userRefresh()
  }

  return (
    <>
      <aside
        className={`fixed top-0 z-50 w-72  h-screen pt-[62px] pb-1 transition-transform  md:translate-x-0 ${openSidenav ? "translate-x-0" : "-translate-x-80"
          }  rounded-xl transition-transform duration-300 `}
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-[#191a3e] ">
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-16 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
          <div className="my-4">
            {routes.slice(2, routes.length).map(({ layout, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {pages.slice(0,pages.length-1).map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink
                      to={`/${layout}${path}`}
                      className="flex  items-center gap-2 p-4  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
                    >
                      {icon}
                      <span className="mr-3 text-lg">{name}</span>
                    </NavLink>
                  </li>
                ))}
                <li >
                  <NavLink
                    onClick={handleLogOut}
                    to='/auth/sign-in'
                    className="flex  items-center gap-2 p-4  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
                  >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 text-inherit" />
                    <span className="mr-3 text-lg">Log Out</span>
                  </NavLink>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </aside>

    </>

  );
}

SideNavCompany.displayName = "/src/widgets/SideNavCompany.jsx";

export default SideNavCompany