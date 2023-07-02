import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useContext } from "react";
import { UserDataContext } from "./context/userDataContext";
import Loader from './pages/loader'

function App() {
  const { userType } = useContext(UserDataContext)
  return (
    <Routes>
      {userType === 'admin' ? <><Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </>
        : userType === 'provider' ? <Route path="/auth/*" element={<Auth />} />
          : userType === "notLogin" ? <>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
          </> :
          <Route path="*" element={<Loader/>} />
            
      }
    </Routes >
  );
}

export default App;
