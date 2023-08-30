import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export function Home() {

  const [ProviderNum, setProviderNum] = useState();
  const [usersData, setUsersData] = useState();
  const [serviceRequest, setServiceRequest] = useState();

  useEffect(() => {
    axios.get('http://localhost:5550/api/getProvider/numberProviders').then((response) => {

      setProviderNum(response.data);
    }).catch((error) => {
      console.error('Error fetching providers number:', error);
    })
  }, []);

  // Fetch users data from the server
  useEffect(() => {

    axios
      .get("http://localhost:5550/api/getUser/numberUsers")
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:5550/api/getRequestServices/numberallRequest/noid`)
      .then((response) => {
        setServiceRequest(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);
  return (
    <>
      <div className="m-10 mx-auto grid max-w-screen-lg  gap-5 sm:grid-cols-3">
        <div className="px-4 py-6 shadow-lg shadow-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bg-rose-400 h-14 w-14 rounded-xl bg-gray-600 p-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <p className="mt-4 font-medium">Users</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {usersData}
          </p>
          <Link to={"/dashboard/Users"}>
            <button className="mt-6 h-10 w-28  rounded-lg bg-green-500 text-sm font-bold text-white shadow-lg hover:bg-green-700">
              More info
            </button>
          </Link>
        </div>

        <div className="px-4 py-6 shadow-lg shadow-gray-300">
          <BuildingStorefrontIcon className="h-14 w-14 rounded-xl bg-blue-400 p-4 text-white" />
          <p className="mt-4 font-medium">Providers</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"

            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {ProviderNum}
          </p>
          <button className="mt-6 h-10 w-28  rounded-lg bg-green-500 text-sm font-bold text-white shadow-lg hover:bg-green-700">
            <Link to={"/dashboard/Providers"}>More info</Link>
          </button>
        </div>

        <div className="px-4 py-6 shadow-lg shadow-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-medium">requests</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {serviceRequest}
          </p>
          <button className="mt-6 h-10 w-28  rounded-lg bg-green-500 text-sm font-bold text-white shadow-lg hover:bg-green-700">
            <Link to={"/dashboard/booking"}>More info</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
