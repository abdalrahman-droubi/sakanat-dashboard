import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Company } from "@/layouts";
import { useContext } from "react";
import { UserDataContext } from "./context/userDataContext";
import Loader from './pages/loader'
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { userType } = useContext(UserDataContext)
  return (
    <>
      {userType === 'admin' ? <>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
        : userType === 'provider' ? <>
          <Routes>
            <Route path="/company/*" element={<Company />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
          : userType === "notLogin" ? <>
            <Routes>
              <Route path="/auth/*" element={<Auth />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </> :
            <Loader />

      }
    </>
  );
}

export default App;
