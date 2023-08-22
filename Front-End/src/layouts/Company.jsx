import { Routes, Route } from "react-router-dom";
import {
  SideNavCompany,
  DashboardNavbar,
  Footer,
  Sidenav,
  CompanyNav,
} from "@/widgets";
import routes from "@/routes";
import PageNotFound from "@/pages/PageNotFound";

export function Company() {


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNavCompany
        routes={routes}
      />
      <div className="p-4 xl:ml-80">
        <CompanyNav/>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "company" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Company.displayName = "/src/layout/Copmany.jsx";

export default Company;
