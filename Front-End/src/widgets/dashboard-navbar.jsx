import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
} from "@material-tailwind/react";
import {
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page, subPage] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color= "white" 
      className={`rounded-xl transition-all py-3 shadow-md shadow-blue-gray-500/5"`}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {subPage} {page} 
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {subPage ? `${subPage}-${page}` : page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/dashboard-navbar.jsx";

export default DashboardNavbar;
