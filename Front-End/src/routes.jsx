import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  UserPlusIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/solid";
import { AddProvider, Home, Users } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import AddUsers from "./pages/dashboard/AddUsers";
import Provider from "./pages/dashboard/Provider";
import EditPitche from "./pages/dashboard/EditPitche";
import Booking from "./pages/dashboard/booking";
import ContactUs from "./pages/dashboard/ContactUs";
// import Tables from "./pages/dashboard/AboutUs";
import AboutUs from "./pages/dashboard/AboutUs";
import DeletedUsers from "./pages/dashboard/DeletedUsers";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Provider",
        path: "/Providers",
        element: <Provider />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Booking",
        path: "/booking",
        element: <Booking />,
      },
      {
        icon: <DocumentPlusIcon {...icon} />,
        name: "Contact Us",
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        icon: <DocumentPlusIcon {...icon} />,
        name: "AboutUs",
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Add provider",
        path: "/provider/add",
        element: <AddProvider />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Add users",
        path: "/user/add",
        element: <AddUsers />,
      },
      {
        icon: <TrashIcon {...icon} />,
        name: "Deleted Users",
        path: "/Deleted Users",
        element: <DeletedUsers />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },

    ],
  },
  {
    title: "without",
    layout: "dashboard",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit pitch",
        path: "/pitches/edit/:id",
        element: <EditPitche />,
      },
    ],
  },
];

export default routes;
