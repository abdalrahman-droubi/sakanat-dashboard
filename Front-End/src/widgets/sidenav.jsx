import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";

export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const{userRefresh} = useContext(UserDataContext)

  

  const handleLogOut = ()=>{
    localStorage.clear();
    userRefresh()
  }

  return (
    <aside
      className={`bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(140vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b border-white/20 `}
      >
        <Link to="/" className="text-center py-6 px-8">
          {/* <Avatar src="/img/goatlogo.png" size="md" /> */}
          <Typography
            variant="h6"
            color="white"
            className="text-xl"
          >
            Sakanat Dashboard
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.slice(0, routes.length - 2).map(({ layout, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={isActive ? "green" : "white"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to='/auth/sign-in'>
                  <Button
                    variant= "text"
                    color="white"
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                    onClick={handleLogOut}
                  >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 text-inherit"/>
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      Log Out
                    </Typography>
                  </Button>
              </NavLink>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
}


Sidenav.displayName = "/src/widgets/sidnave.jsx";

export default Sidenav;
