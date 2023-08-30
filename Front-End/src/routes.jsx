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
import { SignIn } from "@/pages/auth";
import AddUsers from "./pages/dashboard/AddUsers";
import Provider from "./pages/dashboard/Provider";
import EditPitche from "./pages/dashboard/EditPitche";
import Booking from "./pages/dashboard/booking";
import ContactUs from "./pages/dashboard/ContactUs";
// import Tables from "./pages/dashboard/AboutUs";
import AboutUs from "./pages/dashboard/AboutUs";
import DeletedUsers from "./pages/dashboard/DeletedUsers";
import DeletedProviders from "./pages/dashboard/DeletedProviders";
import CompanyDetails from "./pages/company/CompanyDetails";
import RequestedServices from "./pages/company/RequestedServices";
import ServicesInprogres from "./pages/company/ServicesInprogres";
import CompletedServices from "./pages/company/CompletedServices";
import RejectedDeatails from "./pages/company/RejectedDeatails";
import EditInfo from "./pages/company/EditInfo";
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
        name: "Requests",
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
        path: "/Deleted/Users",
        element: <DeletedUsers />,
      },
      {
        icon: <TrashIcon {...icon} />,
        name: "Deleted Providers",
        path: "/Deleted/Provider",
        element: <DeletedProviders />,
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
    title: "company",
    layout: "company",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Company Details",
        path: "/home",
        element: <CompanyDetails />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "requested services",
        path: "/requestedServices",
        element: <RequestedServices />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "services in progress",
        path: "/servicesInprogres",
        element: <ServicesInprogres />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "completed services",
        path: "/completedServices",
        element: <CompletedServices />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "rejected services",
        path: "/rejectedServices",
        element: <RejectedDeatails />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "edit info",
        path: "/editInfo",
        element: <EditInfo />,
      },
    ],
  },
];

export default routes;
