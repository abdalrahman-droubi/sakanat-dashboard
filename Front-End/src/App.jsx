import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useContext } from "react";
import { UserDataContext } from "./context/userDataContext";

function App() {
  const { userType } = useContext(UserDataContext)
  console.log(userType);
  return (
    <Routes>
      {userType === 'admin' ? <><Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </>
        : userType === 'provider' ? <Route path="/auth/*" element={<Auth />} />
          : <>
            {console.log('hhhhhhh')}
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
          </>}
    </Routes>
  );
}

export default App;
