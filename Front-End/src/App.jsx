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
        </Routes>
      </>
        : userType === 'provider' ? <>
        {console.log('aaaaa')}
          <Routes>
            <Route path="/company/*" element={<Company />} />
          </Routes>
        </>
          : userType === "notLogin" ? <>
            <Routes>
              <Route path="/auth/*" element={<Auth />} />
            </Routes>
          </> :
            <Loader />

      }
    </>
  );
}

export default App;
