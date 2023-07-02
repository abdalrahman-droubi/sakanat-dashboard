import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserDataContext = createContext();

export default function UserProviderContext({ children }) {
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState(false);

  const userRefresh = () => {
    if (localStorage.getItem("token")) {
      axios
        .get(`http://localhost:5550/api/auth/getUser`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setUser(response.data);
            setUserType(response.data.role);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUserType("notLogin");
    }
  };
  useEffect(() => {
    userRefresh();
  }, []);

  return (
    <>
      {" "}
      <UserDataContext.Provider
        value={{ user, setUser, userRefresh, userType }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
}
