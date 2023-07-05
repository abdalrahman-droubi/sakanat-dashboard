import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Details from "../../component/Provider/Details";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export function Provider() {
  const [Providers, setProviders] = useState([])
  const [provider, setProvider] = useState()
  const [open, setOpen] = useState(false);
  const [FilterData , setFilterData]=useState([])

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    axios.get('http://localhost:5550/api/getProvider/active').then((response) => {
      setProviders(response.data);
      setFilterData(response.data)
    }).catch((error) => {
      console.error('Error fetching providers data:', error);
    })
  }, []);

  // Update the handleDelete function to remove the deleted user from the state
  const handleDelete = async (id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      axios.put(`http://localhost:5550/api/deleteProvider/${id}`).then((res) => {
        // Remove the deleted user from the state
        if (res.data.success) setProviders(prevData => prevData.filter(provider => provider._id !== id))
      })
        .catch((error) => {
          console.error('Error delete users :', error);
        })
    }
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to DELETE this Provider?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };


  const handleSearch = (Searchede) => {
    const filteredData = Providers.filter((item) =>item.companyName.toLowerCase().includes(Searchede.toLowerCase())
    ||item.city.toLowerCase().includes(Searchede.toLowerCase()) 
    ||item.serviceType.toLowerCase().includes(Searchede.toLowerCase()) 
  );
  setFilterData(filteredData)

  };
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-2">
            <Typography variant="h6" color="white">
              Providers Cards
            </Typography>
            <form>
              {/* <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label> */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Company name, Service type, City"
                  required
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                />
                {/* <Button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </Button> */}
              </div>
            </form>

          </div>
        </CardHeader>
        <CardBody className=" overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name", "Email", "Phone number", "city", 'service Type', "Action"].map((el) => (
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
              {FilterData
                .map((provider, key) => {
                  const className = `py-3 px-5 border-b border-blue-gray-50`;
                  return (
                    <tr key={provider._id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {provider._id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {provider.companyName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {provider.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          0{provider.phoneNumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {provider.city}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {provider.serviceType}
                        </Typography>
                      </td>
                      <td className={className}>
                        {/* <div className="mt-8 flex justify-end sm:flex-row"> */}
                        <div className="grid grid-cols-2 gap-2 justify-center">
                          <div className="justify-center" onClick={() => setProvider(provider)}>
                            <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                              <Tooltip content="Show details" placement="top">
                                <IconButton color="green" onClick={handleOpen} variant="gradient">
                                  <i className="fa-solid fa-circle-info"></i>
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </div>
                          <div className="justify-center">
                            <Tooltip content="Delete Provider" placement="top">
                              <IconButton color="red" onClick={() => handleDelete(provider._id)}>
                                <i className="fa-solid fa-trash"></i>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                        {/* </div> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Details handleOpen={handleOpen} setOpen={setOpen} open={open} provider={provider} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Provider;