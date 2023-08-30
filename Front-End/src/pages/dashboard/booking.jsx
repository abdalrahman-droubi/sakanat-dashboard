import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from '../loader'

import Swal from "sweetalert2";

export function Booking() {
  const [bookings, setbookings] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [lodaer, setlodaer] = useState(false)

  const getbookings = () => {
    axios
      .get(`http://localhost:5550/api/getAllRequest`)
      .then((response) => {
        setbookings(response.data);
        setFilterData(response.data)
        setlodaer(true)
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getbookings();
  }, []);


  const handleSearch = (Searchede) => {
    const filteredData = bookings.filter((item) => item._id.toLowerCase().includes(Searchede.toLowerCase())
      || item.user._id.toLowerCase().includes(Searchede.toLowerCase())
      || item.user.fullName.toLowerCase().includes(Searchede.toLowerCase())
      || item.phoneNumber.toLowerCase().includes(Searchede.toLowerCase())
      || item.provider.companyName.toLowerCase().includes(Searchede.toLowerCase())
      || item.provider._id.toLowerCase().includes(Searchede.toLowerCase())
    );
    setFilterData(filteredData)
  }

  return (
    lodaer?
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-2">
            <Typography variant="h6" color="white">
              Requests Table
            </Typography>
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="request id ,Client ID, Client Name , Provider ID ,Provider Name "
                  required
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                />
              </div>
            </form>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Client ID", "Client Name", "Provider ID", "Provider Name", "service type", "Details", 'Location', "Delivered on", "Requested on", "status"
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterData?.map((request, key) => {
                return (
                  <tr key={request._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography className="text-xs font-semibold text-blue-gray-500">
                            {request._id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.user._id}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.user.fullName}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.provider._id}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.provider.companyName}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.serviceType.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.details}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {request.location}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {new Date(request.dateTime).toLocaleString()}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-500">
                        {new Date(request.createdAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className={`text-sm font-semibold ${request.status === "inprogres" || request.status === "pending" ? "text-yellow-400" : request.status === "rejected" ? "text-red-700" : request.status === "completed" ? "text-green-700" : ""}`}>
                        {request.status}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
     :<Loader />
  );
}

export default Booking;
